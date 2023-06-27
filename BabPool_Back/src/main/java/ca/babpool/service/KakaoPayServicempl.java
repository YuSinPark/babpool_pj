package ca.babpool.service;

import ca.babpool.model.dto.kakaopay.*;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoPayServicempl implements KakaoPayService{
    static final String cid = "TC0ONETIME";

    static final String url = "http://172.30.1.50:3000";
    private final SqlSession sqlSession;

    @Value("${kakao.admin.key}")
    private String KAKAO_ADMIN_KEY;
    private KakaoReadyResponseDto kakaoReady;

    @Override
    public KakaoReadyResponseDto KakaoPayReady(KakaoReadyRequestDto kakaoReadyRequest) {
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String,String>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", kakaoReadyRequest.getPartner_order_id());
        parameters.add("partner_user_id", kakaoReadyRequest.getPartner_user_id());
        parameters.add("item_name", kakaoReadyRequest.getItem_name());
        parameters.add("quantity", kakaoReadyRequest.getQuantity().toString());
        parameters.add("total_amount", kakaoReadyRequest.getTotal_amount().toString());
        parameters.add("tax_free_amount", "0");
        parameters.add("vat_amount", "100");
        parameters.add("approval_url", url+"/result");
        parameters.add("cancel_url", url);
        parameters.add("fail_url", url);
//        parameters.add("approval_url", "http://babpoolme.s3-website.ap-northeast-2.amazonaws.com/ result");
//        parameters.add("cancel_url", "http://babpoolme.s3-website.ap-northeast-2.amazonaws.com/");
//        parameters.add("fail_url", "http://babpoolme.s3-website.ap-northeast-2.amazonaws.com");
        HttpEntity<MultiValueMap<String, String>> requestEntiy = new HttpEntity<MultiValueMap<String, String>>(parameters, this.getHeaders());
        RestTemplate restTemplate = new RestTemplate();
        kakaoReady = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntiy,
                KakaoReadyResponseDto.class);
        return kakaoReady;
    }
    @Override
    public KakaoApproveResponseDto ApproveResponse(KakaoApproveRequestDto kakaoApproveRequest) {
        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoApproveRequest.getTid());
        parameters.add("partner_order_id", kakaoApproveRequest.getPartner_order_id());
        parameters.add("partner_user_id", kakaoApproveRequest.getPartner_user_id());
        parameters.add("pg_token", kakaoApproveRequest.getPg_token());
        parameters.add("total_amount", kakaoApproveRequest.getTotal_amount().toString());

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponseDto approveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponseDto.class);

        return approveResponse;
    }
    @Override
    public KakaoCancelResponseDto KakaoRefund(String tid,Integer total,Long ordersId) {

        sqlSession.update("updataCancel",ordersId);

        // 카카오페이 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", tid);
        parameters.add("cancel_amount", total.toString());
        parameters.add("cancel_tax_free_amount", "0");
        parameters.add("cancel_vat_amount", "100");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponseDto cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponseDto.class);

        return cancelResponse;
    }
    private HttpHeaders getHeaders(){
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + KAKAO_ADMIN_KEY;
        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }
}
