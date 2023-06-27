package ca.babpool.handler;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /**
     * ******************************* Global Error CodeList ***************************************
     * HTTP Status Code
     * 400 : Bad Request
     * 401 : Unauthorized
     * 403 : Forbidden
     * 404 : Not Found
     * 500 : Internal Server Error
     * *********************************************************************************************
     */


    NullPointerException("6001","해당값이 없습니다"),
    BAD_REQUEST_ERROR("G001", "잘못된 서버 요청입니다."),
    IllegalArgumentException("G001", "인자가 잘못됐습니다"),
    BadCredentialsException("G001", "아이디 혹은 비밀번호가 틀렸습니다."),
    REQUEST_BODY_MISSING_ERROR("G002", "Request Body 의 데이터가 없습니다."),
    INVALID_TYPE_VALUE("G003", "타입이 유효하지 않습니다."),

    // Request Parameter 로 데이터가 전달되지 않을 경우
    MISSING_REQUEST_PARAMETER_ERROR("G004", "데이터가 전송되지 않았습니다."),

    IO_ERROR("G008", "입/출력값이 유효하지 않습니다."),

    // com.google.gson JSON 파싱 실패
    JSON_PARSE_ERROR("G009", "JSON 파싱 실패"),

    // com.fasterxml.jackson.core Processing Error
    JACKSON_PROCESS_ERROR("G010", "com.fasterxml.jackson.core Exception"),

    FORBIDDEN_ERROR("G004", "권한이 없습니다."),

    NOT_FOUND_ERROR("G005", "서버로 요청한 리소스가 존재하지 않습니다."),

    NULL_POINT_ERROR("G006", "Null Point Exception 발생"),

    // @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
    NOT_VALID_ERROR("G007", "handle Validation Exception"),

    // @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
    NOT_VALID_HEADER_ERROR("G007", "Header에 데이터가 존재하지 않는 경우 "),

    // 서버가 처리 할 방법을 모르는 경우 발생
    INTERNAL_SERVER_ERROR("G999", "서버가 바보가 됐습니다."),

    AUTH_IS_NULL("A404", "AUTH_IS_NULL"),                // A404
    AUTH_TOKEN_FAIL("A405", "인증을 실패 하였습니다"),            // A405
    AUTH_TOKEN_INVALID("A406", "인증 토큰이 유효하지 않습니다."),            // A406
    AUTH_TOKEN_NOT_MATCH("A407", "인증 토큰이 맞지 않습니다"),        // A407
    AUTH_TOKEN_IS_NULL("A408", "인증 토큰이 존재하지 않습니다."),        // A408


    /**
     * ******************************* Custom Error CodeList ***************************************
     */

    // Business Exception Error
    BUSINESS_EXCEPTION_ERROR("B999", "Business Exception Error"),

    // Transaction Insert Error
    INSERT_ERROR("9999", "Insert Transaction Error Exception"),

    // Transaction Update Error
    UPDATE_ERROR( "9999", "Update Transaction Error Exception"),

    // Transaction Delete Error
    DELETE_ERROR("9999", "Delete Transaction Error Exception"),

    INVALID_API_REQUEST_EXCEPTION_ERROR("I999", "잘못된 API 요청입니다"),

    DATA_INTEGRITY_VIOLATION_EXCEPTION("D001", "DB제약조건에 위배됩니다.")

    ; // End

    /**
     * ******************************* Error Code Constructor ***************************************
     */

    // 에러 코드의 '코드간 구분 값'을 반환한다.
    private String code;
    private String description;

    //에러 코드의 '코드 메시지'을 반환한다.

}
