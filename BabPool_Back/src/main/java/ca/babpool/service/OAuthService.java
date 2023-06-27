package ca.babpool.service;

import ca.babpool.mapper.MemberMapper;
import ca.babpool.model.dto.AuthToken;
import ca.babpool.model.entity.Member;
import ca.babpool.model.entity.Role;
import ca.babpool.oauth.OAuthInfoResponse;
import ca.babpool.oauth.OAuthLoginParams;
import ca.babpool.oauth.RequestOAuthInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class OAuthService {
    private final MemberMapper memberMapper;
    private final OAuthTokensGenerator oAuthTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public AuthToken login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        String memberId = findOrCreateMember(oAuthInfoResponse);
        return oAuthTokensGenerator.generate(memberId);
    }

    private String findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = memberMapper.findById(oAuthInfoResponse.getEmail());
        if (member != null) {
            return member.getMemberId();
        } else {
            return newMember(oAuthInfoResponse);
        }
    }

    private String newMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = Member.builder()
                .memberId(oAuthInfoResponse.getEmail())
                .memberPassword("")
                .memberPhone("전화번호를 입력해주세요!")
                .memberEmail(oAuthInfoResponse.getEmail())
                .memberPoint(0L)
                .memberJoinDate(new Date())
                .memberNickname(oAuthInfoResponse.getNickname())
                .memberName(oAuthInfoResponse.getName())
                .memberIsWithDraw(0)
                .memberRole(Role.MEMBER)
                .memberRefreshToken("")
                .memberSocialType(oAuthInfoResponse.getSocialType())
                .build();

        memberMapper.signup(member);

        return member.getMemberId();
    }
}
