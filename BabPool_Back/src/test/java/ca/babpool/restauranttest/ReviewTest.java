//package ca.babpool.restauranttest;
//
//import ca.babpool.mapper.ReviewMapper;
//import ca.babpool.model.dto.review.ReviewDto;
//import ca.babpool.model.entity.ReviewComment;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.List;
//@SpringBootTest
//public class ReviewTest {
//
//    ReviewComment reviewcomment;
//
//    @Autowired
//    private ReviewMapper reviewMapper;
//
//    @Test
//    @DisplayName("가게별 리뷰 조회")
//    public void getReview(){
//        Long restaurantId =1L;
//        List<ReviewDto> reviewDto = reviewMapper.getRestaurantReview(restaurantId);
//
//        Assertions.assertEquals(reviewDto, reviewMapper.getRestaurantReview(1L));
//    }
//}
