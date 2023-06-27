package ca.babpool.model.dto.orderdetails;

import lombok.Getter;

@Getter
public class OrderDetailCurrentResponseDto {
    private int completeCount;
    private int cookingCount;
    private int inDeliveryCount;
    private int cancelCount;
    private int completeMoney;
}
