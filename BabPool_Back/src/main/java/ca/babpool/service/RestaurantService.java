package ca.babpool.service;
import ca.babpool.model.dto.orders.OrderStatusDto;
import ca.babpool.model.dto.restaurant.*;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface RestaurantService {

    int registerRestaurant(RestaurantRegisterRequestDto restaurantDto) throws IOException;
    RestaurantDto findByRestaurantId(Long restaurantId);
    int updateOwnerRestaurant(RestaurantDto restaurantDto);
    int deleteOwnerRestaurant(Long restaurantId);
    List<RestaurantDto> getAllOwnerRestaurant(String memberId);
    RestaurantResponseDto InformationsFindByRestaurantId(Long restaurantId, String memberId);
    List<RestaurantDto> findByRestaurantCategory(String restaurantCategory);

    int updateRestaurantStatusByIdList(RestaurantStatusRequestDto dto);
    List<RestaurantNewOrderResponseDto> getOrderDetailsByCurDateAndNew(Long restaurantId, String status);
    int updateOrderStatusToCooking(OrderStatusDto orderStatusDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException;

    int updateRefund(Long ordersId);
}
