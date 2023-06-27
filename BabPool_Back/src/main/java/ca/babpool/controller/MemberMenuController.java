package ca.babpool.controller;

import ca.babpool.model.dto.menu.MenuDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/member/menu")
public class MemberMenuController {
    private final ApiResponse apiResponse;

    private final MenuService menuService;

    @Operation(summary = "RestaurantId로 메뉴 정보 전체 가져오기")
    @GetMapping("/all")
    public ListResult<MenuDto> menuAll(@RequestParam("restaurantId") Long restaurantId) {
        return apiResponse.getListResult(menuService.selectAllMenuByRestaurantId(restaurantId));
    }
}
