package ca.babpool.utils;

import ca.babpool.model.dto.restaurantdelivery.RestaurantDeliveryRegisterDto;

import java.util.Random;

public class RestaurantDeliveryUtil {
    public RestaurantDeliveryRegisterDto createRestaurantDeliveryDto(Long restaurantId, String rdTip) {
        Random random = new Random();
        RestaurantDeliveryRegisterDto restaurantDeliveryRegisterDto = new RestaurantDeliveryRegisterDto();

        int rdTimeMin = random.nextInt(21) + 30;
        int rdTimeMax = rdTimeMin + 10;
        int rdTimeAvg = (rdTimeMin + rdTimeMax) / 2;

        int rdPickupTimeMin = random.nextInt(21) + 18;
        int rdPickupTimeMax = rdPickupTimeMin + 7;
        int rdPickupTimeAvg = (rdPickupTimeMin + rdPickupTimeMax) / 2;

        restaurantDeliveryRegisterDto.setRestaurantId(restaurantId);
        restaurantDeliveryRegisterDto.setRdTimeMin(rdTimeMin);
        restaurantDeliveryRegisterDto.setRdTimeMax(rdTimeMax);
        restaurantDeliveryRegisterDto.setRdTimeAvg(rdTimeAvg);
        restaurantDeliveryRegisterDto.setRdPickupTimeMin(rdPickupTimeMin);
        restaurantDeliveryRegisterDto.setRdPickupTimeMax(rdPickupTimeMax);
        restaurantDeliveryRegisterDto.setRdPickupTimeAvg(rdPickupTimeAvg);
        restaurantDeliveryRegisterDto.setRdTip(rdTip);

        return restaurantDeliveryRegisterDto;
    }
}
