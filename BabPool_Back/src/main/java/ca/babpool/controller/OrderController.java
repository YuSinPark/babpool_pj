package ca.babpool.controller;

import ca.babpool.model.dto.restaurant.RestaurantNewOrderDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.service.FCMNotificationService;
import ca.babpool.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class OrderController {

    private final ApiResponse apiResponse;
    private final OrderService orderService;
    private final FCMNotificationService fcmNotificationService;
    private final PlatformTransactionManager transactionManager;

    @Operation(summary = "레스토랑 신규주문")
    @PostMapping("/newOrder")
    public void restaurantNewOrder(@RequestBody RestaurantNewOrderDto dto) {
        orderService.insertNewOrder(dto);
        fcmNotificationService.sendNotificationByToken(fcmNotificationService.createNotificationDto(dto));
    }
}
