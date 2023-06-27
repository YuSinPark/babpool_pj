package ca.babpool.controller;

import ca.babpool.exception.InvalidApiRequestException;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/error")
public class ExceptionController {

    @Operation(summary = "권한오류 컨트롤러")
    @GetMapping("/AuthenticationException")
    public void authException() throws AuthenticationException {
        throw new AuthenticationException();
    }

    @Operation(summary = "허용하지 않는 api")
    @GetMapping("/InvalidApiRequestException")
    public void InvalidApiReqException() throws InvalidApiRequestException {
        throw new InvalidApiRequestException();
    }
}
