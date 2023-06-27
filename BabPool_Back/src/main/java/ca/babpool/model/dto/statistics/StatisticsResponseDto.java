package ca.babpool.model.dto.statistics;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsResponseDto {

    private String dayName;
    private Long dailyCount;
    private Long dailyMoney;

}
