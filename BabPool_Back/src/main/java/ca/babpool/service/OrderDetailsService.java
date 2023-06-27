package ca.babpool.service;

import ca.babpool.model.dto.orderdetails.OrderDetailCurrentResponseDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsRequestDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsResponseDto;
import ca.babpool.model.dto.orderdetails.OrderReceiptDto;


import java.util.List;

public interface OrderDetailsService {

    OrderDetailCurrentResponseDto getOrderStatusCounts(Long restaurantId);

    List<OrderDetailsResponseDto> getOrderDetailsByDate(int offset, int limit, OrderDetailsRequestDto dto);

    List<OrderReceiptDto> getMemberOrderList(String memberId);

    List<OrderReceiptDto> getMenuListByOrderId(String memberId, Long ordersId);
}
