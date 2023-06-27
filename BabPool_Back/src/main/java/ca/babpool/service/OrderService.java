package ca.babpool.service;

import ca.babpool.model.dto.restaurant.RestaurantNewOrderDto;

public interface OrderService {

    int insertNewOrder(RestaurantNewOrderDto dto);
}
