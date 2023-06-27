//package ca.babpool.restauranttest;
//
//import ca.babpool.model.dto.restaurant.RestaurantDto;
//import ca.babpool.model.entity.Restaurant;
//import ca.babpool.mapper.RestaurantMapper;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//public class RestaurantTest {
//
//    @Autowired
//    private RestaurantMapper restaurantMapper;
//    RestaurantDto restaurantDto;
//    Restaurant restaurant;
//
//    final String updatedRestaurantContent = "우리는 지원이 간식~";
//    final long id=52L;
//
//    @BeforeEach
//    void setRestaurantDto() {
//        RestaurantDto restaurant = new RestaurantDto();
//        restaurant.setRestaurantName("공덕식당");
//        restaurant.setRestaurantContent("우리는 강아지 간식을 팔아요~");
//        restaurant.setRestaurantCategory("반려동물 식당");
//    }
//
//
//    @Test
//    @DisplayName("db에 값 입력되는지 확인할 것")
//    public void insertRestaurantMapper() {
//        int result = restaurantMapper.createRestaurant(restaurant);
//        Assertions.assertEquals(result, 1);
//    }
//
//    @Test
//    @DisplayName("레스토랑 아이디로 전체 내용 조회")
//    void viewRestaurantDetail() {
//
//
//        restaurantMapper.createRestaurant(restaurant);
//
//        System.out.println(restaurantMapper.selectRestaurantDetail(1L));
//
//    }
//
//    @Test
//    @DisplayName("레스토랑 내용 수정")
//    void updateRestaurantDetail() {
//        // given
////        restaurantMapper.createRestaurant(restaurantDto);
//
//        // when
//
//        RestaurantDto restaurant = RestaurantDto.toDTO(restaurantMapper.selectRestaurantDetail(52L));
//        System.out.println(restaurant.toString());
//        restaurant.setRestaurantContent(updatedRestaurantContent);
//
//        restaurantMapper.updateRestaurant(Restaurant.toEntity(restaurant));
//
//        // then
//        Restaurant selectedRestaurant = restaurantMapper.selectRestaurantDetail(id);
//        Assertions.assertEquals(selectedRestaurant.getRestaurantContent(),updatedRestaurantContent);
//
//
//    }
//
//    @Test
//    @DisplayName("사장님 레스토랑 목록 가져오기")
//    void getAllRestaurant() {
//        String ownerId = "abcd";
//        System.out.println(restaurantMapper.getAllRestaurant(ownerId));
//    }
//
//    @Test
//    @DisplayName("DTO -> Entity")
//    void createRestaurant() {
//    // given
//        Assertions.assertEquals(Restaurant.toEntity(restaurantDto).getClass(), Restaurant.class);
//
//
//        // when
//
//        // then
//
////        restaurant.setRestaurantAddress("우리집");
////        restaurantMapper.createRestaurant(restaurant);
//    }
//
//    @Test
//    @DisplayName("Entity -> DTO")
//    void changeEntityToDto() {
//        Restaurant restaurant = restaurantMapper.selectRestaurantDetail(1L);
//        RestaurantDto.toDTO(restaurant);
//        System.out.println(restaurantDto.toString());
//    }
//
//
//}
