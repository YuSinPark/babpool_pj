package ca.babpool.controller;

import ca.babpool.model.dto.review.ReviewDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/member/review")
public class MemberReviewController {

    private final ApiResponse apiResponse;
    private final ReviewService reviewService;

    @Operation(summary = "가게별 리뷰")
    @GetMapping("/all")
    public ListResult<ReviewDto> reviewRestaurant(@RequestParam("restaurantId") Long restaurantId) {
        return apiResponse.getListResult(reviewService.getRestaurantReview(restaurantId));
    }

    @Operation(summary = "리뷰답글 갯수 가져오기")
    @GetMapping("/comment")
    public SingleResult<Integer> reviewCommentCount(@RequestParam("restaurantId") Long restaurantId) {
        return apiResponse.getSingleResult(reviewService.getReviewCommentCount(restaurantId));
    }
}
