//package ca.babpool.restauranttest;
//
//import ca.babpool.mapper.OrderDetailsMapper;
//import ca.babpool.mapper.OrderMenuMapper;
//import ca.babpool.mapper.OrderMenuSubMapper;
//import ca.babpool.mapper.OrdersMapper;
//import ca.babpool.model.dto.orders.*;
//import ca.babpool.model.dto.restaurant.RestaurantNewOrderDto;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//public class NewOrderTest {
//
//    @Autowired
//    private OrdersMapper ordersMapper;
//    @Mock
//    private OrderDetailsMapper orderDetailsMapper;
//    @Mock
//    private OrderMenuMapper orderMenuMapper;
//    @Mock
//    private OrderMenuSubMapper orderMenuSubMapper;
//
//    private OrdersDto ordersDto;
//    private OrderDetailsDto orderDetailsDto;
//    private OrderMenuDto orderMenuDto;
//    private OrderMenuSubDto orderMenuSubDto;
//    private List<OrderMenuDto> orderMenuList;
//    private List<OrderMenuSubDto> orderMenuSubList;
//    private RestaurantNewOrderDto restaurantNewOrderDto;
//
//    @BeforeEach
//    public void setUp() {
//        ordersDto = new OrdersDto(1L, "kkm5291");
//        orderDetailsDto = new OrderDetailsDto(1L,
//                1L,
//                "2023-06-12",
//                "3000",
//                "빨리안오면 리뷰 1점줌",
//                "아기깨면 별점 1점",
//                "3000",
//                "new",
//                "서울시 강서구 마곡서1로 146",
//                "asdfsdfsdf",
//                "sdfsdfsdfsdfsdf");
////        orderMenuDto = new OrderMenuDto(1L,
////                1L,
////                1L,
////                2000L,
////                3L);
//
////        orderMenuSubDto = new OrderMenuSubDto(1L,
////                1L,
////                "양파추가",
////                100L);
//
//        orderMenuList = java.util.List.of(orderMenuDto);
//        orderMenuSubList = java.util.List.of(orderMenuSubDto);
////        restaurantNewOrderDto = new RestaurantNewOrderDto(ordersDto,
////                orderDetailsDto,
//////                orderMenuList,
////                orderMenuSubList);
//    }
//
//    @Test
//    @DisplayName("주문 추가 테스트")
//    public void addOrdersTest() {
//        // given
//        OrdersMapper realOrdersMapper = Mockito.spy(ordersMapper);
//        Long expectedOrderId = 1L;
//    }
//
//    @Test
//    @DisplayName("dto 테스트")
//    public void dto_test() {
//        List<OrderMenuSubDto> orderMenuSubDtoList = new ArrayList<>();
//        OrderMenuRequestDto dto = new OrderMenuRequestDto(1L, 1L, 1L, 3000L, 2L, orderMenuSubDtoList);
//        OrderMenuDto orderMenuDto = new OrderMenuDto();
//
//
//    }
//}
