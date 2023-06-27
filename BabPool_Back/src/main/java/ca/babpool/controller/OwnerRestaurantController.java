package ca.babpool.controller;

import ca.babpool.model.dto.orders.OrderStatusDto;
import ca.babpool.model.dto.restaurant.RestaurantDto;
import ca.babpool.model.dto.restaurant.RestaurantNewOrderResponseDto;
import ca.babpool.model.dto.restaurant.RestaurantRegisterRequestDto;
import ca.babpool.model.dto.restaurant.RestaurantStatusRequestDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.CommonResult;
import ca.babpool.model.response.ListResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.RestaurantService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/restaurant")
public class OwnerRestaurantController {

    private final RestaurantService restaurantService;
    private final ApiResponse apiResponse;


    @Operation(summary = "MemberId로 해당 owner 레스토랑 목록 전체 불러오기")
    @GetMapping("")
    public ListResult<RestaurantDto> viewAllRestaurant() throws IllegalArgumentException {
        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();
        return apiResponse.getListResult(restaurantService.getAllOwnerRestaurant(memberId));
    }

    @Operation(summary = "레스토랑 등록")
    @PostMapping("/register")
    public SingleResult<Integer> registerRestaurant(@RequestBody RestaurantRegisterRequestDto restaurantDto) throws IOException {
        return apiResponse.getSingleResult(restaurantService.registerRestaurant(restaurantDto));
    }


    @Operation(summary = "레스토랑 삭제")
    @DeleteMapping("/{restaurantId}")
    public SingleResult<Integer> deleteRestaurant(@PathVariable Long restaurantId) {
        return apiResponse.getSingleResult(restaurantService.deleteOwnerRestaurant(restaurantId));
    }

    @Operation(summary = "오너용 레스토랑 상세정보")
    @GetMapping("/{restaurantId}")
    public SingleResult<RestaurantDto> restaurantDetails(@PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getSingleResult(restaurantService.findByRestaurantId(restaurantId));
    }

    @Operation(summary = "레스토랑 정보 수정")
    @PatchMapping("/{restaurantId}")
    public SingleResult<Integer> modifyRestaurant(@RequestBody RestaurantDto restaurantDto) {
        return apiResponse.getSingleResult(restaurantService.updateOwnerRestaurant(restaurantDto));
    }

    @Operation(summary = "레스토랑 상태 수정")
    @PatchMapping("/{restaurantId}/status")
    public CommonResult modifyRestaurantStatus(@RequestBody RestaurantStatusRequestDto dto) {
        return apiResponse.getSuccessResult(restaurantService.updateRestaurantStatusByIdList(dto));
    }

    @Operation(summary = "레스토랑 신규주문 확인")
    @GetMapping("/{restaurantId}/newOrder")
    public ListResult<RestaurantNewOrderResponseDto> findNewOrder(@PathVariable("restaurantId") Long restaurantId, @RequestParam("status") String status) {
        return apiResponse.getListResult(restaurantService.getOrderDetailsByCurDateAndNew(restaurantId, status));
    }

    @Operation(summary = "주문 상태 변경")
    @PostMapping("/{restaurantId}/changeStatus")
    public CommonResult changeStatus(@RequestBody OrderStatusDto orderStatusDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        return apiResponse.getSuccessResult(restaurantService.updateOrderStatusToCooking(orderStatusDto));
    }
    @Operation(summary ="환불상태로 변경")
    @GetMapping("/{restaurantId}/refund")
    public CommonResult changeRefund(@RequestParam("ordersId")Long ordersId){
        return apiResponse.getSuccessResult(restaurantService.updateRefund(ordersId));
    }
}
