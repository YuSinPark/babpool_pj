package ca.babpool.service;

import ca.babpool.model.dto.CouponDto;

import java.util.List;

public interface CouponService {


    List<CouponDto> getAllMemberCoupon(String memberId);
    List<CouponDto> getCanUseCoupon(String memberId, Long restaurantId, Long price);

    int addNewCoupon(CouponDto dto);

}
