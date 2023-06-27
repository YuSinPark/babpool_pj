package ca.babpool.controller;

import ca.babpool.model.dto.menu.MenuDto;
import ca.babpool.model.dto.menuoption.OwnerMenuOptionRequestDto;
import ca.babpool.model.dto.menuoption.OwnerMenuOptionResponseDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.CommonResult;
import ca.babpool.model.response.ListResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.MenuOptionService;
import ca.babpool.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/menu")
public class OwnerMenuController {

    private final MenuService menuService;
    private final MenuOptionService menuOptionService;
    private final ApiResponse apiResponse;

    @Operation(summary = "RestaurantId로 메뉴 정보 가져오기 (Status값이 Y인 애들만)")
    @GetMapping("/{restaurantId}")
    public ListResult<MenuDto> menuDetails(@PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getListResult(menuService.selectMenuByRestaurantId(restaurantId));
    }

    @Operation(summary = "Menu 업데이트하기")
    @PatchMapping("/{restaurantId}")
    public CommonResult updateMenu(@RequestBody MenuDto menuDto) {
        return apiResponse.getSuccessResult(menuService.updateMenu(menuDto));
    }

    @Operation(summary = "Menu 추가하기")
    @PostMapping("/{restaurantId}")
    public SingleResult<Integer> addMenu(@RequestBody MenuDto menuDto) throws IOException {
        return apiResponse.getSingleResult(menuService.insertMenu(menuDto));
    }

    @Operation(summary = "대표메뉴 목록 가져오기")
    @GetMapping("/{restaurantId}/representative")
    public ListResult<MenuDto> findRepresentativeMenu(@PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getListResult(menuService.selectRepresentativeMenu(restaurantId));
    }

    @Operation(summary = "대표메뉴 설정하기")
    @PostMapping("/{restaurantId}/representative")
    public CommonResult updateRepresentativeMenu(@RequestBody Map<String, List<Long>> menuIdList) {
        return apiResponse.getSuccessResult(menuService.updateRepresentativeMenu(menuIdList));
    }

    @Operation(summary = "메뉴 삭제")
    @PostMapping("/{restaurantId}/deleteMenu")
    public CommonResult deleteMenu(@RequestBody Map<String, Long> menuId) {
        return apiResponse.getSingleResult(menuService.deleteMenuByMenuId(menuId));
    }

    @Operation(summary = "품절, 숨기기 메뉴 가져오기")
    @GetMapping("/{restaurantId}/soldOutHide")
    public ListResult<MenuDto> selectHideOrSoldOutMenu(@PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getListResult(menuService.selectHideOrSoldOutMenu(restaurantId));
    }

    @Operation(summary = "메뉴 옵션 목록 가져오기")
    @GetMapping("/{restaurantId}/menuOption")
    public ListResult<OwnerMenuOptionResponseDto> selectMenuOption(@PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getListResult(menuOptionService.findMenuOptionByRestaurantId(restaurantId));
    }

    @Operation(summary = "메뉴 옵션 추가하기")
    @PostMapping("/{restaurantId}/menuOption")
    public CommonResult addMenuOption(@RequestBody OwnerMenuOptionRequestDto dto, @PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getSuccessResult(menuOptionService.addMenuOptionAndMenuOptionGroup(dto, restaurantId));
    }

    @Operation(summary = "메뉴 옵션 변경하기")
    @PatchMapping("/{restaurantId}/menuOption")
    public CommonResult modifyMenuOption(@RequestBody OwnerMenuOptionRequestDto dto, @PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getSuccessResult(menuOptionService.updateMenuOption(dto, restaurantId));
    }
}
