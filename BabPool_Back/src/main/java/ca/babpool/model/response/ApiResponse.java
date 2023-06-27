package ca.babpool.model.response;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ApiResponse {

    // 단일건 결과 처리 메서드
    public <T> SingleResult<T> getSingleResult(T data) {
        SingleResult<T> result = new SingleResult<>();
        result.setData(data);
        setSuccessResult(result);
        return result;
    }

    // 복수건 결과 처리 메서드
    public <T> ListResult<T> getListResult(List<T> list) {
        ListResult<T> result = new ListResult<>();
        result.setData(list);
        setSuccessResult(result);
        return result;
    }

    // 성공 결과만 처리
    public CommonResult getSuccessResult(int i) {
        CommonResult result = new CommonResult();
        setSuccessResult(result);
        return result;
    }

    //실패 결과만 처리
    public CommonResult getFailResult() {
        CommonResult result = new CommonResult();
        setFailResult(result);
        return result;
    }

    //오류 코드 포함 처리
    public CommonResult getFailResult(String code, String cause) {
        CommonResult result = new CommonResult();
        result.setSuccess(false);
        result.setCode(code);
        result.setMsg(cause);

        return result;
    }

    // API 요청 성공 시 응답 모델을 성공 데이터로 세팅
    private void setSuccessResult(CommonResult result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    private void setFailResult(CommonResult result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }
}
