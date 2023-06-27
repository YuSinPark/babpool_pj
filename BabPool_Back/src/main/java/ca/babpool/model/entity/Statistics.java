package ca.babpool.model.entity;

import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    private Long statisticsId;
    private Long restaurantId;
    private Long statisticsDailyCount;
    private Long statisticsDailyMoney;
    private Date statisticsDate;

}
