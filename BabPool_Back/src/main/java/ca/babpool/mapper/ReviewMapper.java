package ca.babpool.mapper;

import ca.babpool.model.dto.review.ReviewResponseDto;
import ca.babpool.model.dto.review.ReviewDto;
import ca.babpool.model.entity.ReviewComment;
import org.apache.ibatis.annotations.Mapper;
import ca.babpool.model.entity.Review;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {

    int insertReview(Review entity);
    List<ReviewDto> getRestaurantReview(@Param("restaurantId")Long restaurantId);
    List<ReviewResponseDto> selectReviewForOwner(@Param("offset") int offset, @Param("limit") int limit, @Param("restaurantId") Long restaurantId);
    List<ReviewResponseDto> selectReviewForMember(String memberId);
    int getReviewCommentCount(Long reviewId);
    int deleteMyReview(Long reviewId);
}
