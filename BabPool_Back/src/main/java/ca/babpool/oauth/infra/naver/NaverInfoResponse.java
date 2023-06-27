package ca.babpool.oauth.infra.naver;

import ca.babpool.model.entity.SocialType;
import ca.babpool.oauth.OAuthInfoResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class NaverInfoResponse implements OAuthInfoResponse {

    @JsonProperty("response")
    private Response response;

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Response {
        private String email;
        private String nickname;
        private String name;
    }
    @Override
    public String getEmail() {
        return response.email;
    }

    @Override
    public String getNickname() {
        return response.nickname;
    }

    @Override
    public SocialType getSocialType() {
        return SocialType.NAVER;
    }

    @Override
    public String getPhone() {
        return null;
    }

    @Override
    public String getName() {
        return response.name;
    }
}
