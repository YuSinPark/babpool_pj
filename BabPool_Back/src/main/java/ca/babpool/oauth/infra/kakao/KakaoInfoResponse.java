package ca.babpool.oauth.infra.kakao;

import ca.babpool.model.entity.SocialType;
import ca.babpool.oauth.OAuthInfoResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoInfoResponse implements OAuthInfoResponse {

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class KakaoAccount {
        private KakaoProfile profile;
        private String email;
        private String phone_number;
        private String name;
    }

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class KakaoProfile {
        private String nickname;
    }

    @Override
    public String getEmail() {
        return kakaoAccount.email;
    }

    @Override
    public String getNickname() {
        return "닉네임을 정해주세요!";
    }

    @Override
    public SocialType getSocialType() {
        return SocialType.KAKAO;
    }

    @Override
    public String getPhone() {
        return null;
    }

    @Override
    public String getName() {
        return kakaoAccount.profile.nickname;
    }
}
