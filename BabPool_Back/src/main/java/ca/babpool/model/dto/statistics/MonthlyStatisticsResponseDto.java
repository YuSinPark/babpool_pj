package ca.babpool.model.dto.statistics;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyStatisticsResponseDto {
    private String monthName;
    private Long monthlyCount;
    private Long monthlyMoney;
}
