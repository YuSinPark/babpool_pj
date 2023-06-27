package ca.babpool.exception;

import ca.babpool.handler.ErrorCode;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class InvalidApiRequestException extends RuntimeException {
    ErrorCode errorCode;
}
