package ca.babpool.handler;

import ca.babpool.exception.InvalidApiRequestException;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.CommonResult;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;
import java.io.IOException;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {

    private final ApiResponse apiResponse;

    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult NullPointerException(Exception e) {
        return apiResponse.getFailResult(ErrorCode.NullPointerException.getCode(), ErrorCode.NullPointerException.getDescription());
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult BadCredentialsException(Exception e) {
        return apiResponse.getFailResult(ErrorCode.BadCredentialsException.getCode(), ErrorCode.BadCredentialsException.getDescription());
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    protected CommonResult AuthenticationException(Exception e) {
        return apiResponse.getFailResult(ErrorCode.FORBIDDEN_ERROR.getCode(), ErrorCode.FORBIDDEN_ERROR.getDescription());
    }

    @ExceptionHandler(IOException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult IOException(Exception e) {
        return apiResponse.getFailResult(ErrorCode.IO_ERROR.getCode(), ErrorCode.IO_ERROR.getDescription());
    }

    @ExceptionHandler(BusinessExceptionHandler.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult BusinessException(Exception e) {
        return apiResponse.getFailResult(ErrorCode.BUSINESS_EXCEPTION_ERROR.getCode(), e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult IllegalArgumentException(Exception e) {
        return apiResponse.getFailResult(ErrorCode.IllegalArgumentException.getCode(), ErrorCode.IllegalArgumentException.getDescription());
    }

    @ExceptionHandler(InvalidApiRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult InvalidApiRequestException(Exception e) {
        return apiResponse.getFailResult(ErrorCode.INVALID_API_REQUEST_EXCEPTION_ERROR.getCode(), ErrorCode.INVALID_API_REQUEST_EXCEPTION_ERROR.getDescription());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult DataIntegrityViolationException() {
        return apiResponse.getFailResult(ErrorCode.DATA_INTEGRITY_VIOLATION_EXCEPTION.getCode(), ErrorCode.DATA_INTEGRITY_VIOLATION_EXCEPTION.getDescription());
    }
}
