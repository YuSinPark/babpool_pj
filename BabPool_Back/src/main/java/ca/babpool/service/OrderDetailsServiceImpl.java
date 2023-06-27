package ca.babpool.service;

import ca.babpool.mapper.OrderDetailsMapper;
import ca.babpool.model.dto.orderdetails.OrderDetailCurrentResponseDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsRequestDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsResponseDto;
import ca.babpool.model.dto.orderdetails.OrderReceiptDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderDetailsServiceImpl implements OrderDetailsService {

    private final OrderDetailsMapper mapper;
    @Override
    public OrderDetailCurrentResponseDto getOrderStatusCounts(Long restaurantId) {
        return mapper.getOrderStatusCounts(restaurantId);
    }

    @Override
    public List<OrderDetailsResponseDto> getOrderDetailsByDate(int offset, int limit, OrderDetailsRequestDto dto) {
        String startDate = dto.getStartDate();
        String endDate = dto.getEndDate();
        Long restaurantId = dto.getRestaurantId();
        return mapper.getOrderDetailsByDate(startDate, endDate, restaurantId, offset, limit);
    }

    @Override
    public List<OrderReceiptDto> getMemberOrderList(String memberId) {
        return mapper.getMemberOrderList(memberId);
    }

    @Override
    public List<OrderReceiptDto> getMenuListByOrderId(String memberId, Long ordersId) {
        return mapper.getMenuListByOrderId(memberId, ordersId);
    }

}
