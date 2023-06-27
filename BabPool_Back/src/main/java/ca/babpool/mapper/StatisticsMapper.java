package ca.babpool.mapper;

import ca.babpool.model.dto.statistics.MonthlyStatisticsResponseDto;
import ca.babpool.model.dto.statistics.StatisticsResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StatisticsMapper {
    List<StatisticsResponseDto> getWeeklyStatistics(Long restaurantId);
    List<StatisticsResponseDto> getLastWeekStatistics(Long restaurantId);
    List<MonthlyStatisticsResponseDto> findMonthSalesDataByRestaurantId(@Param("restaurantId") Long restaurantId, @Param("year") String year);
}
