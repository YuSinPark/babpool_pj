package ca.babpool.model.dto.restaurant;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RestaurantStatusRequestDto {
    private List<Long> restaurantIdList;
    private String restaurantStatus;
}
