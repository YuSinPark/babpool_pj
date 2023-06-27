//package ca.babpool.restauranttest;
//
//import ca.babpool.mapper.RestaurantMapper;
//import ca.babpool.sevice.RestaurantService;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//
//import java.util.HashMap;
//import java.util.Map;
//
//public class ExceptionTest {
//
//    RestaurantService restaurantService;
//    private Map<String, String> id;
//    private String memberId;
//
//    @BeforeEach
//    void memberId_설정() {
//        id = new HashMap<>();
//        id.put("memberId", "hhhh");
//        memberId = "hhhh";
//    }
//
//    @Test
//    void 예외테스트() {
//        Assertions.assertThrows(NullPointerException.class, () -> {
//            restaurantService.getAllOwnerRestaurant(memberId);
//        });
//    }
//}
