package ca.babpool.controller;

import ca.babpool.mapper.MemberMapper;
import ca.babpool.model.dto.*;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.CommonResult;
import ca.babpool.model.response.ListResult;
import ca.babpool.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final ApiResponse apiResponse;
    private final MemberService memberService;
    private final MemberMapper memberMapper;


    @PostMapping("/memberSignup")
    public CommonResult MemberSignup(@RequestBody MemberRequestDto requestDto) {
        return apiResponse.getSingleResult(memberService.MemberSignup(requestDto));
    }

    @PostMapping("/ownerSignup")
    public CommonResult ownerSignup(@RequestBody OwnerRequestDto requestDto) {
        return apiResponse.getSingleResult(memberService.OwnerSignup(requestDto));
    }

    @GetMapping("/checkMemberId")
    public CommonResult checkId(@RequestParam String memberId) {
        return apiResponse.getSingleResult(memberMapper.idCheck(memberId));
    }

    @GetMapping("/checkMemberNickname")
    public CommonResult checkNickname(@RequestParam String memberNickname) {
        return apiResponse.getSingleResult(memberMapper.NicknameCheck(memberNickname));
    }

    @GetMapping("/removeRefreshToken")
    public CommonResult removeRefreshToken(@RequestParam String memberId) {
        return apiResponse.getSingleResult(memberMapper.removeRefreshToken(memberId));
    }

    @GetMapping("/Withdrawal")
    public CommonResult Withdrawal(@RequestParam String memberId) {
        return apiResponse.getSingleResult(memberMapper.Withdrawal(memberId));
    }

    @PostMapping("/updateFirebaseToken")
    public CommonResult updateFirebaseToken(@RequestBody Map<String, String> FBToken) {
        return apiResponse.getSuccessResult(memberService.updateFirebaseToken(FBToken));
    }

    @PostMapping("/findMyId")
    public ListResult<String> findMemberId(@RequestBody MemberRequestDto requestDto) {
        return apiResponse.getListResult(memberService.findMemberId(requestDto.getMemberEmail(), requestDto.getMemberPhone()));
    }

    @PostMapping("/resetMemberPw")
    public CommonResult resetMemberPassword(@RequestBody MemberRequestDto requestDto) throws Exception {
        return apiResponse.getSuccessResult(memberService.resetPassword(requestDto.getMemberId(), requestDto.getMemberEmail()));
    }
}
