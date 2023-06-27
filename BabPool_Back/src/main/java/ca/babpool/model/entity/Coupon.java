package ca.babpool.model.entity;

import ca.babpool.model.dto.CouponDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {
    private Long couponId;
    private String memberId;
    private String couponName;
    private String couponContent;
    private Long couponPrice;
    private Long couponMinOrderPrice;
    private String couponExpire;
    private Long restaurantId;

    public static Coupon toEntity(CouponDto dto)
    {
        return Coupon.builder()
                .couponId(dto.getCouponId())
                .memberId(dto.getMemberId())
                .couponName(dto.getCouponName())
                .couponContent(dto.getCouponContent())
                .couponPrice(dto.getCouponPrice())
                .couponMinOrderPrice(dto.getCouponMinOrderPrice())
                .couponExpire(dto.getCouponExpire())
                .restaurantId(dto.getRestaurantId())
                .build();
    }
}
