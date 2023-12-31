package ca.babpool.model.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    MEMBER("ROLE_MEMBER"), OWNER("ROLE_OWNER");

    private final String Key;
}
