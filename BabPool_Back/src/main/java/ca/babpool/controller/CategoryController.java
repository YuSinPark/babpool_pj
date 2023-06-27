package ca.babpool.controller;

import ca.babpool.model.dto.restaurant.RestaurantDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/restaurant/category")
public class CategoryController {

    private final RestaurantService restaurantService;
    private final ApiResponse apiResponse;


    @Operation(summary = "카테고리별 레스토랑 목록")
    @GetMapping("")
    public ListResult<RestaurantDto> restaurantDetails(@RequestParam("restaurantCategory") String restaurantCategory) {
        return apiResponse.getListResult(restaurantService.findByRestaurantCategory(restaurantCategory));
    }


}