package ca.babpool.model.dto.orderdetails;

import ca.babpool.model.entity.OrderDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderDetailsResponseDto {
    private Long ordersId;
    private String memberId;
    private String restaurantName;
    private String orderDetailsDate;
    private String orderDetailsPrice;
    private String orderDetailsComment;
    private String orderDetailsRiderComment;
    private String orderDetailsTip;
    private String orderDetailsStatus;
    private String orderDetailsAddress;
    private int orderDetailsCount;
    private String orderDetailsPT;
    private String orderDetailsTID;
    private String orderDetailsOID;
    private String orderDetailsCoupon;
    private String orderDetailsPoint;
    private String orderDetailsExtrareQuireMent;
}