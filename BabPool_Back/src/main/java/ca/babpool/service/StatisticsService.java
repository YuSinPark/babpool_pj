package ca.babpool.service;

import ca.babpool.model.dto.statistics.MonthlyStatisticsResponseDto;
import ca.babpool.model.dto.statistics.StatisticsResponseDto;

import java.util.List;
import java.util.Map;

public interface StatisticsService {
    List<List<StatisticsResponseDto>> getRestaurantSalesStatistics(Long restaurantId);

    List<MonthlyStatisticsResponseDto> findMonthSalesDataByRestaurantId(Long restaurantId, Map<String, String> selectedYear);
}
