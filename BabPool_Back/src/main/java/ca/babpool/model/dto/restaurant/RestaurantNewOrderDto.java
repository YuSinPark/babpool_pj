package ca.babpool.model.dto.restaurant;

import ca.babpool.model.dto.orderdetails.OrderDetailsDto;
import ca.babpool.model.dto.orders.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantNewOrderDto {

    private OrdersDto ordersDto;
    private OrderDetailsDto orderDetailsDto;
    private List<OrderMenuRequestDto> orderMenuRequestDtoList;
    private Long couponId;
}
