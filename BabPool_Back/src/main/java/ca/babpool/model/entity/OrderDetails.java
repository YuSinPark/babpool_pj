package ca.babpool.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderDetails {
    private Long ordersId;
    private Long restaurantId;
    private String orderDetailsPoint;
    private String orderDetailsDate;
    private String orderDetailsPrice;
    private String orderDetailsComment;
    private String orderDetailsRiderComment;
    private String orderDetailsTip;
    private String orderDetailsStatus;
    private String orderDetailsAddress;
    private String orderDetailsTID;
    private String orderDetailsOID;
    private String orderDetailsCoupon;
    private String orderDetailsExtrareQuireMent;

    public static OrderDetails toEntity(OrderDetails entity) {
        return OrderDetails.builder()
                .ordersId(entity.getOrdersId())
                .restaurantId(entity.getRestaurantId())
                .orderDetailsPoint(entity.getOrderDetailsPoint())
                .orderDetailsDate(entity.getOrderDetailsDate())
                .orderDetailsPrice(entity.getOrderDetailsPrice())
                .orderDetailsComment(entity.getOrderDetailsComment())
                .orderDetailsRiderComment(entity.getOrderDetailsRiderComment())
                .orderDetailsTip(entity.getOrderDetailsTip())
                .orderDetailsStatus(entity.getOrderDetailsStatus())
                .orderDetailsAddress(entity.getOrderDetailsAddress())
                .orderDetailsTID(entity.getOrderDetailsTID())
                .orderDetailsOID(entity.getOrderDetailsOID())
                .orderDetailsCoupon(entity.getOrderDetailsCoupon())
                .orderDetailsExtrareQuireMent(entity.getOrderDetailsExtrareQuireMent())
                .build();
    }
}
