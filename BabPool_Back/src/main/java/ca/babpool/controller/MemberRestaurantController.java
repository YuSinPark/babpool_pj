package ca.babpool.controller;

import ca.babpool.model.dto.restaurant.RestaurantResponseDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/member/restaurant")
public class MemberRestaurantController {

    private final RestaurantService restaurantService;
    private final ApiResponse apiResponse;

    @Operation(summary = "레스토랑 상세정보")
    @GetMapping("/information")
    public SingleResult<RestaurantResponseDto> restaurantInformationDetails(@RequestParam("restaurantId") Long restaurantId,@RequestParam("memberId") String memberId) {
        return apiResponse.getSingleResult(restaurantService.InformationsFindByRestaurantId(restaurantId,memberId));
    }
}
