//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.controller;

import ca.babpool.model.dto.CouponDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.service.CouponService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"api/v1/coupon"})
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;
    private final ApiResponse apiResponse;


    @Operation(summary = "memberId로 멤버 쿠폰 목록 가져오기")
    @GetMapping("")
    public ListResult<CouponDto> viewAllCoupon(@RequestParam("memberId") String memberId) {
        return apiResponse.getListResult(couponService.getAllMemberCoupon(memberId));
    }


    @GetMapping("/canuse")
    public ListResult<CouponDto> viewCanUseCoupon(@RequestParam("memberId") String memberId, @RequestParam("restaurantId") Long restaurantId, @RequestParam("price") Long price) {
        return apiResponse.getListResult(couponService.getCanUseCoupon(memberId, restaurantId, price));
    }

}
