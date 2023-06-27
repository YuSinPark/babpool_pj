package ca.babpool.oauth;

import ca.babpool.model.entity.SocialType;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {
    SocialType socialtype();
    MultiValueMap<String, String> makeBody();
}
