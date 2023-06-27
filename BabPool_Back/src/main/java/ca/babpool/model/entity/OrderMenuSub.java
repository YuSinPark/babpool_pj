package ca.babpool.model.entity;

import ca.babpool.model.dto.orders.OrderMenuSubDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class OrderMenuSub {
    private Long orderMenuSubId;
    private Long orderMenuId;
    private String orderMenuSubName;
    private Long orderMenuSubPrice;
    private Long menuOptionId;

    public static OrderMenuSub toDto(OrderMenuSubDto dto) {
        return OrderMenuSub.builder()
                .orderMenuSubId(dto.getOrderMenuSubId())
                .orderMenuId(dto.getOrderMenuId())
                .orderMenuSubName(dto.getOrderMenuSubName())
                .orderMenuSubPrice(dto.getOrderMenuSubPrice())
                .menuOptionId(dto.getMenuOptionId())
                .build();
    }
}
