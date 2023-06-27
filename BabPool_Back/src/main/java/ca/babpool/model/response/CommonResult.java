package ca.babpool.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonResult {

    /**
     * success : 응답 성공 여부 (T/F)
     * code : 응답 코드 (>=0 정상, <0 비정상)
     * msg : 응답 메세지
     */
    private boolean success;
    private String code;
    private String msg;
}
