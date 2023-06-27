package ca.babpool.model.entity;

import ca.babpool.model.dto.restaurant.RestaurantDeliveryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDelivery {
    private Long rdId;
    private Long restaurantId;
    private String rdTimeMin;
    private String rdTimeMax;
    private String rdTimeAvg;
    private String rdPickupTimeMin;
    private String rdPickupTimeMax;
    private String rdPickupTimeAvg;
    private String rdTip;
    private String rdType;
    private String rdArea;

    public static RestaurantDelivery toEntity(RestaurantDeliveryDto dto){
        return RestaurantDelivery.builder()
                .rdId(dto.getRdId())
                .restaurantId(dto.getRestaurantId())
                .rdTimeMin(dto.getRdTimeMin())
                .rdTimeMax(dto.getRdTimeMax())
                .rdTimeAvg(dto.getRdTimeAvg())
                .rdPickupTimeMin(dto.getRdPickupTimeMin())
                .rdPickupTimeMax(dto.getRdPickupTimeMax())
                .rdPickupTimeAvg(dto.getRdPickupTimeAvg())
                .rdTip(dto.getRdTip())
                .rdType(dto.getRdType())
                .rdArea(dto.getRdArea())
                .build();
    }
}
