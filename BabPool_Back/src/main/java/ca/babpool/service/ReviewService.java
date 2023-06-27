package ca.babpool.service;

import ca.babpool.model.dto.review.ReviewResponseDto;
import ca.babpool.model.dto.review.ReviewDto;

import java.io.IOException;
import java.util.List;

public interface ReviewService{

    int insertReview(ReviewDto dto) throws IOException;
    List<ReviewDto> getRestaurantReview(Long restaurantId);
    List<ReviewResponseDto> selectReviewForOwner(Long restaurantId, int offset, int limit);
    List<ReviewResponseDto> selectReviewForMember(String memberId);
    int deleteMyReview(Long reviewId);
    int getReviewCommentCount(Long restaurantId);
    List<ReviewDto> getOwnerRestaurantReview(Long restaurantId);
}
