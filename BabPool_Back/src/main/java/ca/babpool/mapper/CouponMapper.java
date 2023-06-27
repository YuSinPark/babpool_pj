//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.mapper;

import ca.babpool.model.dto.CouponDto;
import ca.babpool.model.entity.Coupon;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CouponMapper {

    List<CouponDto> getAllCoupon(String memberId);
    List<CouponDto> getCanUseCoupon(@Param("memberId")String memberId, @Param("restaurantId")Long restaurantId, @Param("price") Long price);
    int insertCoupon(CouponDto couponDto);
    int deleteCoupon(Long couponId);
}
