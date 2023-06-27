package ca.babpool.filter;

import ca.babpool.handler.BusinessExceptionHandler;
import ca.babpool.handler.ErrorCode;
import ca.babpool.mapper.MemberMapper;
import ca.babpool.model.entity.Member;
import ca.babpool.service.JwtService;
import ca.babpool.utils.PasswordUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL = "/login";

    private final JwtService jwtService;
    private final MemberMapper memberMapper;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        List<String> list = Arrays.asList(
                "/login", "/member/ownerSignup", "/member/memberSignup", "/member/Withdrawal", "/member/removeRefreshToken", "/member/checkMemberId",
                "/member/findMyId", "/member/checkMemberNickname", "/member/resetMemberPw",

                "/api/v1/address", "/api/v1/address/choose",

                "/api/v1/search",  "/api/v1/search/create", "/api/v1/search/count", "/api/v1/search/popular", "/api/v1/search/distance", "/api/v1/search/rating",
                "/api/v1/search/reply", "/api/v1/search/minPrice", "/api/v1/search/deliveryTime",

                "/api/v1/restaurant/category",

                "/api/v1/payment/member/success","/api/v1/payment/owner/refund", "/api/v1/payment/member/ready",

                "/api/v1/member/restaurant/information", "/api/v1/member/menu/all","/api/v1/member/menuOption/options",
                "/api/v1/member/review/all", "/api/v1/member/review/comment",

                "/auth/naver", "/auth/kakao", "/login/oauth2/code/kakao", "/login/oauth2/code/naver",

                "/api/v1/like/member/create","/api/v1/like/member/delete",

                "/swagger-ui/index.html"
        );

        if (list.contains(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElse(null);

        if (refreshToken != null) {
            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
        }

        if (refreshToken == null) {
            checkAccessTokenAndAuthentication(request, response, filterChain);
        }
    }

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) throws IOException {
        Member memberRefreshToken = memberMapper.findByRefreshToken(refreshToken);


        if (memberRefreshToken != null) {
            String reIssuedRefreshToken = reIssuedRefreshToken(memberRefreshToken.getMemberId());
            String accessToken = jwtService.createAccessToken(memberRefreshToken.getMemberId());
            jwtService.sendAccessAndRefreshToken(response, accessToken, reIssuedRefreshToken);
        }
    }

    public String reIssuedRefreshToken(String memberId) {
        String reIssuedRefreshToken = jwtService.createRefreshToken();
        memberMapper.updateRefreshToken(memberId, reIssuedRefreshToken);
        return reIssuedRefreshToken;
    }

    public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response,
                                                  FilterChain filterChain) throws ServletException, IOException {

        try {
            Optional<String> tokenOption = jwtService.extractAccessToken(request);

            String token = tokenOption.orElseThrow(() -> new BusinessExceptionHandler("토큰이 없습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
            if (jwtService.isTokenValid(token)) {

                Optional<String> IdOption = jwtService.extractId(token);

                String memberId = IdOption.orElseThrow(() -> new BusinessExceptionHandler("유저가 존재하지 않습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR));
                if (memberId != null) {
                    Member member = memberMapper.findById(memberId);
                    if (member != null) {
                        saveAuthentication(member);
                        filterChain.doFilter(request, response);
                    }
                } else {
                    throw new BusinessExceptionHandler("유저가 존재하지 않습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
                }
            } else {
                throw new BusinessExceptionHandler("토큰이 유효하지 않습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
            }
        } catch (Exception e) {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            JSONObject jsonObject = jsonResponseWrapper(e);
            printWriter.print(jsonObject);
            printWriter.flush();
            printWriter.close();
        }

    }

    public void saveAuthentication(Member myMember) {
        String password = myMember.getMemberPassword();
        if (password == null) {
            password = PasswordUtil.generateRandomPassword();
        }

        UserDetails userDetailsMember = org.springframework.security.core.userdetails.User.builder()
                .username(myMember.getMemberId())
                .password(password)
                .roles(myMember.getMemberRole().name())
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsMember, null,
                        authoritiesMapper.mapAuthorities(userDetailsMember.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private JSONObject jsonResponseWrapper(Exception e) {
        String resultMsg = "";

        if (e instanceof ExpiredJwtException) {
            resultMsg = "토큰이 만료되었습니다";
        } else if (e instanceof SignatureException) {
            resultMsg = "허용된 토큰이 아닙니다";
        } else if (e instanceof JwtException) {
            resultMsg = "토큰에 오류가 발생하였습니다";
        } else {
            resultMsg = "알수없는 오류가 발생하였습니다";
        }

        HashMap<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("status", 401);
        jsonMap.put("code", "9999");
        jsonMap.put("message", resultMsg);
        jsonMap.put("reason", e.getMessage());
        JSONObject jsonObject = new JSONObject(jsonMap);
        logger.error(resultMsg, e);
        return jsonObject;
    }
}
