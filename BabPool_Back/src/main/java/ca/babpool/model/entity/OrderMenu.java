package ca.babpool.model.entity;

import ca.babpool.model.dto.orders.OrderMenuDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderMenu {

    private Long orderMenuId;
    private Long ordersId;
    private Long menuId;
    private Long orderMenuPrice;
    private Long orderMenuCount;

    public static OrderMenu toEntity(OrderMenuDto dto) {
        return OrderMenu.builder()
                .orderMenuId(dto.getOrderMenuId())
                .ordersId(dto.getOrdersId())
                .menuId(dto.getMenuId())
                .orderMenuPrice(dto.getOrderMenuPrice())
                .orderMenuCount(dto.getOrderMenuCount())
                .build();
    }
}
