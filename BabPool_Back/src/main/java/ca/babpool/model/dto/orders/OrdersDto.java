package ca.babpool.model.dto.orders;

import ca.babpool.model.entity.Orders;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrdersDto {
    private Long ordersId;
    private String memberId;
    private Boolean ordersReview;

    public static OrdersDto toDto(Orders entity) {
        return OrdersDto.builder()
                .ordersId(entity.getOrdersId())
                .memberId(entity.getMemberId())
                .ordersReview(entity.getOrdersReview())
                .build();
    }
}