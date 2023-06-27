package ca.babpool.oauth;

import ca.babpool.model.entity.SocialType;
import lombok.ToString;

public interface OAuthInfoResponse {
    String getEmail();
    String getNickname();
    SocialType getSocialType();
    String getPhone();
    String getName();
}
