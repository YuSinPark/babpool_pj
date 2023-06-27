//package ca.babpool.sevice;
//
//import ca.babpool.mapper.OrderDetailsMapper;
//import ca.babpool.mapper.OrderMenuMapper;
//import ca.babpool.mapper.OrderMenuSubMapper;
//import ca.babpool.mapper.OrdersMapper;
//import ca.babpool.model.dto.orderdetails.OrderDetailsDto;
//import ca.babpool.model.dto.orders.OrderMenuRequestDto;
//import ca.babpool.model.dto.orders.OrderMenuSubDto;
//import ca.babpool.model.dto.orders.OrdersDto;
//import ca.babpool.model.dto.restaurant.RestaurantNewOrderDto;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.MockitoAnnotations;
//import org.springframework.test.util.ReflectionTestUtils;
//
//import java.util.Collections;
//
//public class OrderServiceTest {
//
//    @InjectMocks
//    private OrderServiceImpl orderService;
//
//    @Mock
//    private OrdersMapper ordersMapper;
//    @Mock
//    private OrderDetailsMapper orderDetailsMapper;
//    @Mock
//    private OrderMenuMapper orderMenuMapper;
//    @Mock
//    private OrderMenuSubMapper orderMenuSubMapper;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//
////        orderService = new OrderServiceImpl(ordersMapper, orderDetailsMapper, orderMenuMapper, orderMenuSubMapper);
////        ReflectionTestUtils.setField(orderService, "ordersMapper", ordersMapper);
////        ReflectionTestUtils.setField(orderService, "orderDetailsMapper", orderDetailsMapper);
////        ReflectionTestUtils.setField(orderService, "orderMenuMapper", orderMenuMapper);
////        ReflectionTestUtils.setField(orderService, "orderMenuSubMapper", orderMenuSubMapper);
//    }
//
//    @Test
//    @DisplayName("새 주문 삽입")
//    public void insertNewOrder() {
//        // Mock 데이터 설정
//        RestaurantNewOrderDto dto = new RestaurantNewOrderDto();
//        OrdersDto ordersDto = new OrdersDto(1L, "kkm5291");
//        OrderDetailsDto orderDetailsDto = new OrderDetailsDto();
//        OrderMenuRequestDto orderMenuRequestDto = new OrderMenuRequestDto();
//        orderMenuRequestDto.setOrdersId(1L);
//        orderMenuRequestDto.setMenuId(2L);
//        orderMenuRequestDto.setOrderMenuPrice(1000L);
//        orderMenuRequestDto.setOrderMenuCount(3L);
//        orderMenuRequestDto.setOrderMenuSubDtoList(Collections.emptyList());
//
//        dto.setOrdersDto(ordersDto);
//        dto.setOrderDetailsDto(orderDetailsDto);
//        dto.setOrderMenuRequestDtoList(Collections.singletonList(orderMenuRequestDto));
//
//        // OrdersMapper 목 설정
//        Mockito.when(ordersMapper.addOrders(ordersDto)).thenReturn(1L);
//
//        // OrderDetailsMapper 목 설정
//        Mockito.doNothing().when(orderDetailsMapper).addOrderDetails(orderDetailsDto);
//
//        // OrderMenuMapper 목 설정
//        Mockito.when(orderMenuMapper.addOrderMenu(orderMenuRequestDto)).thenReturn(2L);
//
//        // OrderMenuSubMapper 목 설정
//        Mockito.doNothing().when(orderMenuSubMapper).addOrderMenuSub(Mockito.any(OrderMenuSubDto.class));
//
//        // 테스트 대상 메서드 호출
//        orderService.insertNewOrder(dto);
//
//        // OrdersMapper 메서드 호출 검증
//        Mockito.verify(ordersMapper, Mockito.times(1)).addOrders(ordersDto);
//
//        // OrderDetailsMapper 메서드 호출 검증
//        Mockito.verify(orderDetailsMapper, Mockito.times(1)).addOrderDetails(orderDetailsDto);
//
//        // OrderMenuMapper 메서드 호출 검증
//        Mockito.verify(orderMenuMapper, Mockito.times(1)).addOrderMenu(orderMenuRequestDto);
//
//        // OrderMenuSubMapper 메서드 호출 검증
//        Mockito.verify(orderMenuSubMapper, Mockito.times(0)).addOrderMenuSub(Mockito.any(OrderMenuSubDto.class));
//    }
//}
//
