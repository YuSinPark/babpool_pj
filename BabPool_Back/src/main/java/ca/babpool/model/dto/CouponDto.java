package ca.babpool.model.dto;

import ca.babpool.model.entity.Coupon;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString
@AllArgsConstructor
public class CouponDto {
    private Long couponId;
    private String memberId;
    private String couponName;
    private String couponContent;
    private Long couponPrice;
    private Long couponMinOrderPrice;
    private String couponExpire;
    private Long restaurantId;

    public static CouponDto toDTO(Coupon entity)
    {
        return CouponDto.builder()
                .couponId(entity.getCouponId())
                .memberId(entity.getMemberId())
                .couponName(entity.getCouponName())
                .couponContent(entity.getCouponContent())
                .couponPrice(entity.getCouponPrice())
                .couponMinOrderPrice(entity.getCouponMinOrderPrice())
                .couponExpire(entity.getCouponExpire())
                .restaurantId(entity.getRestaurantId())
                .build();
    }
}
