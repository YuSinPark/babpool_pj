package ca.babpool.model.dto.orders;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderMenuRequestDto {
    private Long orderMenuId;
    private Long ordersId;
    private Long menuId;
    private Long orderMenuPrice;
    private Long orderMenuCount;
    private List<OrderMenuSubDto> orderMenuSubDtoList;
}