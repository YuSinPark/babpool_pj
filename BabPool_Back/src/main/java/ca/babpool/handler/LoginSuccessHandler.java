package ca.babpool.handler;

import ca.babpool.mapper.MemberMapper;
import ca.babpool.model.entity.Member;
import ca.babpool.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberMapper memberMapper;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        String memberId = extractUsername(authentication);
        String accessToken = jwtService.createAccessToken(memberId);
        String refreshToken = jwtService.createRefreshToken();

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);

        Member memberName = memberMapper.findById(memberId);

        if (memberName != null) {
            if (memberName.getMemberIsWithDraw() != 1) {
                memberMapper.updateRefreshToken(memberId, refreshToken);
            } else {
                throw new BusinessExceptionHandler("탈퇴한 회원입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
            }
        }
        log.info("로그인에 성공하였습니다. 이메일 : {}", memberId);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("로그인에 성공하였습니다. RefreshToken : {}", refreshToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
