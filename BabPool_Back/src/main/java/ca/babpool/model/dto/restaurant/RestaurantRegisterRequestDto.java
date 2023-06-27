package ca.babpool.model.dto.restaurant;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RestaurantRegisterRequestDto {

    private Long restaurantId;
    private String memberId;
    private String restaurantCategory;
    private String restaurantName;
    private String restaurantAddress;
    private String restaurantPhone;
    private String restaurantMinPrice;
    private String restaurantPhoto;
    private String restaurantDetailAddress;
    private String restaurantLicenseNumber;
    private Double restaurantLatitude;
    private Double restaurantLongitude;
    private String restaurantRdTip;

}
