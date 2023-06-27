package ca.babpool.mapper;

import ca.babpool.model.dto.orders.OrderMenuSubDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderMenuSubMapper {
    void addOrderMenuSub(OrderMenuSubDto dto);

    List<OrderMenuSubDto> findOrderMenuSubByOrderMenuId(Long orderMenuId);
}
