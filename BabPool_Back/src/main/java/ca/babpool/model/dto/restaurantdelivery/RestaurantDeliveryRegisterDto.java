package ca.babpool.model.dto.restaurantdelivery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDeliveryRegisterDto {

    private Long rdId;
    private Long restaurantId;
    private int rdTimeMin;
    private int rdTimeAvg;
    private int rdTimeMax;
    private String rdTip;
    private String rdType;
    private String rdArea;
    private int rdPickupTimeMin;
    private int rdPickupTimeAvg;
    private int rdPickupTimeMax;
}
