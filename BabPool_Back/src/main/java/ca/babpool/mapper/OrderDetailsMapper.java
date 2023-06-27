package ca.babpool.mapper;

import ca.babpool.model.dto.orderdetails.OrderDetailCurrentResponseDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsResponseDto;
import ca.babpool.model.dto.orderdetails.OrderReceiptDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsDto;
import ca.babpool.model.dto.orders.OrderStatusDto;
import ca.babpool.model.dto.restaurant.RestaurantDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderDetailsMapper {

    OrderDetailCurrentResponseDto getOrderStatusCounts(Long restaurantId);

    List<OrderDetailsResponseDto> getOrderDetailsByDate(@Param("startDate") String startDate, @Param("endDate") String endDate, @Param("restaurantId") Long restaurantId, @Param("offset") int offset, @Param("limit") int limit);

    void addOrderDetails(OrderDetailsDto dto);

    List<OrderDetailsResponseDto> getOrderDetailsByCurDateAndNew(@Param("restaurantId") Long restaurantId, @Param("status") String status);

    int updateOrderStatusToCooking(OrderStatusDto orderStatusDto);

    List<OrderReceiptDto> getMemberOrderList(@Param("memberId") String memberId);

    List<OrderReceiptDto> getMenuListByOrderId(@Param("memberId") String memberId, @Param("ordersId") Long ordersId);

    RestaurantDto findRestaurantNameByOrdersId(Long ordersId);
    OrderDetailsDto findByIdForAll(Long orderId);

}
