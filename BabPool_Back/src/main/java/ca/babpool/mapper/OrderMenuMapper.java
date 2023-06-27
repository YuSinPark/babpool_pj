package ca.babpool.mapper;

import ca.babpool.model.dto.orders.OrderMenuRequestDto;
import ca.babpool.model.dto.orders.OrderMenuResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderMenuMapper {
    Long addOrderMenu(OrderMenuRequestDto dto);
    List<OrderMenuResponseDto> findOrderMenuByOrdersId(Long ordersId);
}
