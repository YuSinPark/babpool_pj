package ca.babpool.model.dto.orderdetails;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Setter
@ToString
public class OrderDetailsDto {
    private Long ordersId;
    private Long restaurantId;
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
    private String orderDetailsPoint;
    private String orderDetailsExtrareQuireMent;

    public static OrderDetailsDto toDto(OrderDetailsDto dto) {
        return OrderDetailsDto.builder()
                .ordersId(dto.getOrdersId())
                .restaurantId(dto.getRestaurantId())
                .orderDetailsDate(dto.getOrderDetailsDate())
                .orderDetailsPrice(dto.getOrderDetailsPrice())
                .orderDetailsComment(dto.getOrderDetailsComment())
                .orderDetailsRiderComment(dto.getOrderDetailsRiderComment())
                .orderDetailsTip(dto.getOrderDetailsTip())
                .orderDetailsStatus(dto.getOrderDetailsStatus())
                .orderDetailsAddress(dto.getOrderDetailsAddress())
                .orderDetailsTID(dto.getOrderDetailsTID())
                .orderDetailsOID(dto.getOrderDetailsOID())
                .orderDetailsCoupon(dto.getOrderDetailsCoupon())
                .orderDetailsPoint(dto.getOrderDetailsPoint())
                .orderDetailsExtrareQuireMent(dto.getOrderDetailsExtrareQuireMent())
                .build();
    }
}
