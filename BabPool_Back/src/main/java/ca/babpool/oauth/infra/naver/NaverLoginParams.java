package ca.babpool.oauth.infra.naver;

import ca.babpool.model.entity.SocialType;
import ca.babpool.oauth.OAuthLoginParams;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class NaverLoginParams implements OAuthLoginParams {

    private String authorizationCode;
    private String state;

    @Override
    public SocialType socialtype() {
        return SocialType.NAVER;
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        body.add("state", state);
        return body;
    }
}
