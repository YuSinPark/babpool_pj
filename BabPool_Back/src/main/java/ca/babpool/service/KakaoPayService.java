package ca.babpool.service;

import ca.babpool.model.dto.kakaopay.*;


public interface KakaoPayService {

    KakaoReadyResponseDto KakaoPayReady(KakaoReadyRequestDto kakaoReadyRequest);
    KakaoApproveResponseDto ApproveResponse(KakaoApproveRequestDto kakaoApproveRequestDto);
    KakaoCancelResponseDto KakaoRefund(String tid,Integer total,Long ordersId);
}
