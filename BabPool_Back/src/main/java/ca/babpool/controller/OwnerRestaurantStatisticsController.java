package ca.babpool.controller;

import ca.babpool.model.dto.statistics.MonthlyStatisticsResponseDto;
import ca.babpool.model.dto.statistics.StatisticsResponseDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/statistics")
public class OwnerRestaurantStatisticsController {

    private final StatisticsService statisticsService;
    private final ApiResponse apiResponse;

    @Operation(summary = "레스토랑 주간 통계")
    @GetMapping("/{restaurantId}")
    public ListResult<List<StatisticsResponseDto>> getWeeklyStatistics(@PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getListResult(statisticsService.getRestaurantSalesStatistics(restaurantId));
    }

    @Operation(summary = "레스토랑 월별 통계")
    @PostMapping("/{restaurantId}")
    public ListResult<MonthlyStatisticsResponseDto> getMonthlyStatistics(@PathVariable("restaurantId") Long restaurantId, @RequestBody Map<String, String> selectedYear) {
        return apiResponse.getListResult(statisticsService.findMonthSalesDataByRestaurantId(restaurantId, selectedYear));
    }
}
