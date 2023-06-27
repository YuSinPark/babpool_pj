package ca.babpool.model.dto.orders;
import ca.babpool.model.entity.OrderMenuSub;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderMenuSubDto {
    private Long orderMenuSubId;
    private Long orderMenuId;
    private String orderMenuSubName;
    private Long orderMenuSubPrice;
    private Long menuOptionId;


    public static OrderMenuSubDto toDto(OrderMenuSub entity) {
        return OrderMenuSubDto.builder()
                .orderMenuSubId(entity.getOrderMenuSubId())
                .orderMenuId(entity.getOrderMenuId())
                .orderMenuSubName(entity.getOrderMenuSubName())
                .orderMenuSubPrice(entity.getOrderMenuSubPrice())
                .menuOptionId(entity.getMenuOptionId())
                .build();
    }
}
