package ca.babpool.model.dto.orders;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderMenuResponseDto {
    private Long orderMenuId;
    private Long ordersId;
    private String menuName;
    private Long orderMenuPrice;
    private Long orderMenuCount;
    private List<OrderMenuSubDto> orderMenuSubDtoList;
}
