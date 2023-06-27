package ca.babpool.controller;

import ca.babpool.model.dto.kakaopay.*;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class KakaopayController {
    private final KakaoPayService kakaoPayService;

    private final ApiResponse apiResponse;
    @PostMapping("/member/ready")
    public KakaoReadyResponseDto readyToKakaoPay(@RequestBody KakaoReadyRequestDto kakaoReadyRequest){
        return kakaoPayService.KakaoPayReady(kakaoReadyRequest);
    }

    @PostMapping("/member/success")
    public KakaoApproveResponseDto afterPayRequest(@RequestBody KakaoApproveRequestDto kakaoApproveRequest) {
        KakaoApproveResponseDto kakaoApprove = kakaoPayService.ApproveResponse(kakaoApproveRequest);

        return kakaoApprove;
    }

    @GetMapping("/member/cancel")
    public void cancel() {

    }

    @GetMapping("/member/fail")
    public void fail(){

    }
    @GetMapping("/owner/cancel")
    public KakaoCancelResponseDto refund(@RequestParam("tid")String tid,@RequestParam("amount")Integer total,@RequestParam("ordersId")Long ordersId) {



        KakaoCancelResponseDto kakaoCancelResponse = kakaoPayService.KakaoRefund(tid,total,ordersId);

        return kakaoCancelResponse;
    }
}
