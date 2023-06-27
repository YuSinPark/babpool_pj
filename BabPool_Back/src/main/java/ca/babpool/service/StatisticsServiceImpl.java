package ca.babpool.service;

import ca.babpool.mapper.StatisticsMapper;
import ca.babpool.model.dto.statistics.MonthlyStatisticsResponseDto;
import ca.babpool.model.dto.statistics.StatisticsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final StatisticsMapper mapper;

    public List<List<StatisticsResponseDto>> getRestaurantSalesStatistics(Long restaurantId) {
        List<List<StatisticsResponseDto>> combinedList = new ArrayList<>();

        List<StatisticsResponseDto> thisWeekStatistics = mapper.getWeeklyStatistics(restaurantId);
        List<StatisticsResponseDto> lastWeekStatistics = mapper.getLastWeekStatistics(restaurantId);

        combinedList.add(thisWeekStatistics);
        combinedList.add(lastWeekStatistics);

        return combinedList;
    }

    @Override
    public List<MonthlyStatisticsResponseDto> findMonthSalesDataByRestaurantId(Long restaurantId, Map<String, String> selectedYear) {
        String year = selectedYear.get("selectedYear");
        return mapper.findMonthSalesDataByRestaurantId(restaurantId, year);
    }
}
