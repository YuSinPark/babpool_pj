package ca.babpool.controller;

import ca.babpool.model.dto.*;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.CommonResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.oauth.infra.kakao.KakaoLoginParams;
import ca.babpool.oauth.infra.naver.NaverLoginParams;
import ca.babpool.service.AuthService;
import ca.babpool.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final ApiResponse apiResponse;
    private final AuthService authService;
    private final OAuthService oAuthService;

    @GetMapping("/OwnerMe")
    public SingleResult<OwnerResponseDto> findOwnerInfoById() {
        return apiResponse.getSingleResult(authService.findOwnerInfoById());
    }

    @GetMapping("/MemberMe")
    public SingleResult<MemberResponseDto> findMemberInfoById() {
        return apiResponse.getSingleResult(authService.findMemberInfoById());
    }

    @PostMapping("/ChangeOwnerNickname")
    public SingleResult<OwnerResponseDto> changeOwnerNickname(@RequestBody OwnerRequestDto requestDto) {
        return apiResponse.getSingleResult(authService.changeOwnerNickname(requestDto.getMemberId(), requestDto.getMemberNickname()));
    }

    @PostMapping("/ChangeMemberNickname")
    public SingleResult<MemberResponseDto> changeMemberNickname(@RequestBody MemberRequestDto requestDto) {
        return apiResponse.getSingleResult(authService.changeMemberNickname(requestDto.getMemberId(), requestDto.getMemberNickname()));
    }

    @PostMapping("/ChangeMemberPhone")
    public SingleResult<MemberResponseDto> ChangeMemberPhone(@RequestBody MemberRequestDto requestDto) {
        return apiResponse.getSingleResult(authService.ChangeMemberPhone(requestDto.getMemberId(), requestDto.getMemberPhone()));
    }

    @PostMapping("/ChangePassword")
    public CommonResult changePassword(@RequestBody ChangePasswordRequestDto requestDto) {
        return apiResponse.getSuccessResult(authService.changeMemberPassword(requestDto.getExPassword(), requestDto.getNewPassword()));
    }

    @GetMapping("/kakao")
    public SingleResult<AuthToken> loginKakao(@RequestParam("code") String code) {
        KakaoLoginParams params = new KakaoLoginParams();
        params.setAuthorizationCode(code);
        return apiResponse.getSingleResult(oAuthService.login(params));
    }

    @GetMapping("/naver")
    public SingleResult<AuthToken> loginNaver(@RequestParam("code") String code) {
        NaverLoginParams params = new NaverLoginParams();
        params.setAuthorizationCode(code);
        return apiResponse.getSingleResult(oAuthService.login(params));
    }

    @PostMapping("/plusInfo")
    public CommonResult PlusMemberInfo(@RequestBody MemberRequestDto requestDto) {
        return apiResponse.getSuccessResult(authService.plusMemberInfo(requestDto.getMemberNickname(), requestDto.getMemberPhone()));
    }
}


