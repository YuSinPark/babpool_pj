package ca.babpool.model.dto.orderdetails;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderDetailsRequestDto {
    String startDate;
    String endDate;
    Long restaurantId;
}
