package ca.babpool.model.dto.orders;
import ca.babpool.model.entity.OrderMenu;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderMenuDto {
    private Long orderMenuId;
    private Long ordersId;
    private Long menuId;
    private Long orderMenuPrice;
    private Long orderMenuCount;


    public static OrderMenuDto toDto(OrderMenu entity) {
        return OrderMenuDto.builder()
                .orderMenuId(entity.getOrderMenuId())
                .ordersId(entity.getOrdersId())
                .menuId(entity.getMenuId())
                .orderMenuPrice(entity.getOrderMenuPrice())
                .orderMenuCount(entity.getOrderMenuCount())
                .build();
    }
}

