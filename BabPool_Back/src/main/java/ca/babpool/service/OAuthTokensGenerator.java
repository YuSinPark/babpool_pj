package ca.babpool.service;

import ca.babpool.mapper.MemberMapper;
import ca.babpool.model.dto.AuthToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuthTokensGenerator {

    private static final String BEARER_TYPE = "Bearer ";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;

    private final JwtService jwtService;
    private final MemberMapper memberMapper;

    public AuthToken generate(String memberId) {

        String subject = memberId.toString();
        String accessToken = jwtService.createAccessToken(subject);
        String refreshToken = jwtService.createRefreshToken();

        memberMapper.updateRefreshToken(memberId,refreshToken);

        return AuthToken.of(accessToken, refreshToken, BEARER_TYPE, ACCESS_TOKEN_EXPIRE_TIME);
    }

    public Long extractMemberId(String accessToken) {
        return Long.valueOf(jwtService.extractSubject(accessToken));
    }
}
