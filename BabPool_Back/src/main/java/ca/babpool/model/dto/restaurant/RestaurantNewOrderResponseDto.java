package ca.babpool.model.dto.restaurant;

import ca.babpool.model.dto.orderdetails.OrderDetailsResponseDto;
import ca.babpool.model.dto.orders.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RestaurantNewOrderResponseDto {

    private OrderDetailsResponseDto orderDetailsResponseDto;
    private List<OrderMenuResponseDto> orderMenuResponseDtoList;
}
