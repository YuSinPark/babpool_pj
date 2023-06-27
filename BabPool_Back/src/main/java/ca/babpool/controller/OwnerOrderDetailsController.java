package ca.babpool.controller;

import ca.babpool.model.dto.orderdetails.OrderDetailCurrentResponseDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsRequestDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsResponseDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.OrderDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/orderDetails")
public class OwnerOrderDetailsController {

    private final OrderDetailsService orderDetailsService;
    private final ApiResponse apiResponse;

    @Operation(summary = "금일 주문 현황")
    @GetMapping("/{restaurantId}")
    public SingleResult<OrderDetailCurrentResponseDto> getOrderCount(@PathVariable("restaurantId") Long restaurantId) {
        return apiResponse.getSingleResult(orderDetailsService.getOrderStatusCounts(restaurantId));
    }

    @Operation(summary = "사장님용 주문상세")
    @PostMapping("")
    public ListResult<OrderDetailsResponseDto> getOwnerOrderDetails(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit,
            @RequestBody OrderDetailsRequestDto requestDto
    ) {
        return apiResponse.getListResult(orderDetailsService.getOrderDetailsByDate(offset, limit, requestDto));
    }
}
