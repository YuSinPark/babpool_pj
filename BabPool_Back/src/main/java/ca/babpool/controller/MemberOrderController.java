package ca.babpool.controller;

import ca.babpool.model.dto.orderdetails.OrderReceiptDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.service.OrderDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/member/orderlist")
public class MemberOrderController {
    private final ApiResponse apiResponse;

    private final OrderDetailsService orderDetailsService;

    @Operation(summary = "memberId로 멤버 주문 정보 전체 가져오기")
    @GetMapping("/all")
    public ListResult<OrderReceiptDto> getMemberOrderList(@RequestParam("memberId") String memberId) {
        return apiResponse.getListResult(orderDetailsService.getMemberOrderList(memberId));
    }

    @Operation(summary = "ordersId로 멤버 주문 상세 정보 가져오기")
    @GetMapping("/detail")
    public ListResult<OrderReceiptDto> getMenuListByOrderId(@RequestParam("memberId") String memberId,@RequestParam("ordersId") Long ordersId) {
        return apiResponse.getListResult(orderDetailsService.getMenuListByOrderId(memberId, ordersId));
    }
}
