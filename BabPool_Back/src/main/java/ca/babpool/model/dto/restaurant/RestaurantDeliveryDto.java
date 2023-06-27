package ca.babpool.model.dto.restaurant;

import ca.babpool.model.entity.RestaurantDelivery;
import lombok.*;

@Getter
@NoArgsConstructor
@Builder
@Setter
@ToString
public class RestaurantDeliveryDto {

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

    public RestaurantDeliveryDto(Long rdId, Long restaurantId, String rdTimeMin, String rdTimeMax, String rdTimeAvg, String rdPickupTimeMin, String rdPickupTimeMax, String rdPickupTimeAvg, String rdTip, String rdType, String rdArea) {
        this.rdId = rdId;
        this.restaurantId = restaurantId;
        this.rdTimeMin = rdTimeMin;
        this.rdTimeMax = rdTimeMax;
        this.rdTimeAvg = rdTimeAvg;
        this.rdPickupTimeMin = rdPickupTimeMin;
        this.rdPickupTimeMax = rdPickupTimeMax;
        this.rdPickupTimeAvg = rdPickupTimeAvg;
        this.rdTip = rdTip;
        this.rdType = rdType;
        this.rdArea = rdArea;
    }

    public static RestaurantDeliveryDto toDTO(RestaurantDelivery entity){
        return RestaurantDeliveryDto.builder()
                .rdId(entity.getRdId())
                .restaurantId(entity.getRestaurantId())
                .rdTimeMin(entity.getRdTimeMin())
                .rdTimeMax(entity.getRdTimeMax())
                .rdTimeAvg(entity.getRdTimeAvg())
                .rdPickupTimeMin(entity.getRdPickupTimeMin())
                .rdPickupTimeMax(entity.getRdPickupTimeMax())
                .rdPickupTimeAvg(entity.getRdPickupTimeAvg())
                .rdTip(entity.getRdTip())
                .rdType(entity.getRdType())
                .rdArea(entity.getRdArea())
                .build();
    }
}
