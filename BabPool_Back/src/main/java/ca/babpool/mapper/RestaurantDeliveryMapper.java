package ca.babpool.mapper;

import ca.babpool.model.dto.restaurantdelivery.RestaurantDeliveryRegisterDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RestaurantDeliveryMapper {

    int insertRestaurantDelivery(RestaurantDeliveryRegisterDto dto);
}
