package ca.babpool.model.dto.orders;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderStatusDto {
    private Long ordersId;
    private String orderDetailsStatus;
    private String orderDetailsPT;
}
