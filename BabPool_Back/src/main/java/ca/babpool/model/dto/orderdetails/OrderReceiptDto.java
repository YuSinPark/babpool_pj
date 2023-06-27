package ca.babpool.model.dto.orderdetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder

public class OrderReceiptDto {

    private Long ordersId;
    private String memberId;
    private Long restaurantId;
    private String restaurantName;
    private Long orderMenuId;
    private Long menuId;
    private String menuName;
    private String orderMenuPrice;
    private String orderMenuCount;
    private Long orderMenuSubId;
    private String orderMenuSubName;
    private String orderMenuSubPrice;
    private Long menuOptionId;
    private String orderDetailsRequest;
    private String orderDetailsDate;
    private String orderDetailsPrice;
    private String orderDetailsPoint;
    private String orderDetailsComment;
    private String orderDetailsRiderComment;
    private String orderDetailsTip;
    private String orderDetailsStatus;
    private String orderDetailsAddress;
    private String orderDetailsCoupon;
    private Boolean ordersReview;
    private String orderDetailsExtrareQuireMent;
}
