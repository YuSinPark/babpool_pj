package ca.babpool.oauth;

import ca.babpool.model.entity.SocialType;

public interface OAuthApiClient {
    SocialType socialType();
    String requestAccessToken(OAuthLoginParams params);
    OAuthInfoResponse requestOauthInfo(String accessToken);
}
