package ca.babpool.model.entity;

import ca.babpool.model.dto.orders.OrdersDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Orders {
    private Long ordersId;
    private String memberId;
    private Boolean ordersReview;

    public static Orders toEntity(OrdersDto dto) {
        return Orders.builder()
                .ordersId(dto.getOrdersId())
                .memberId(dto.getMemberId())
                .ordersReview(dto.getOrdersReview())
                .build();
    }
}
