package ca.babpool.controller;

import ca.babpool.model.dto.CouponDto;
import ca.babpool.model.dto.review.ReviewCommentDto;
import ca.babpool.model.dto.review.ReviewDto;
import ca.babpool.model.dto.review.ReviewResponseDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.CommonResult;
import ca.babpool.model.response.ListResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.CouponService;
import ca.babpool.service.ReviewCommentService;
import ca.babpool.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewCommentService reviewCommentService;
    private final ApiResponse apiResponse;
    private final CouponService couponService;

    @Operation(summary = "레스토랑별 리뷰가져오기, 닉네임으로")
    @GetMapping("/owner/{restaurantId}")
    public ListResult<ReviewResponseDto> reviewsByRestaurant(
            @PathVariable("restaurantId") Long restaurantId,
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return apiResponse.getListResult(reviewService.selectReviewForOwner(restaurantId, offset, limit));
    }

    @Operation(summary = "사장님 댓글달기")
    @PostMapping("/owner/{restaurantId}")
    public SingleResult<Integer> writeReviewComment(@RequestBody ReviewCommentDto dto) {
        return apiResponse.getSingleResult(reviewCommentService.insertOwnerComment(dto));
    }

    @Operation(summary = "사장님 댓글 삭제")
    @DeleteMapping("/owner/{restaurantId}/{reviewCommentId}")
    public SingleResult<Integer> deleteReviewComment(@PathVariable("reviewCommentId") Long reviewCommentId) {
        return apiResponse.getSingleResult(reviewCommentService.deleteOwnerComment(reviewCommentId));
    }

    @Operation(summary = "리뷰에서 단골쿠폰 발급")
    @PostMapping("/owner/{restaurantId}/newCoupon")
    public CommonResult addCoupon(@RequestBody CouponDto couponDto) {
        return apiResponse.getSuccessResult(couponService.addNewCoupon(couponDto));
    }

    @Operation(summary = "사용자별 리뷰가져오기, memberId로")
    @GetMapping("/myreview")
    public ListResult<ReviewResponseDto> reviewsByMember(@RequestParam("memberId") String memberId) {
        return apiResponse.getListResult(reviewService.selectReviewForMember(memberId));
    }

    @Operation(summary = "사용자 리뷰삭제")
    @DeleteMapping("/myreview/{reviewId}")
    public SingleResult<Integer> deleteMyReview(@PathVariable("reviewId") Long reviewId) {
        return apiResponse.getSingleResult(reviewService.deleteMyReview(reviewId));
    }

    @Operation(summary = "사용자 리뷰작성")
    @PostMapping("/myreview/create")
    public SingleResult<Integer> insertReview(@RequestBody ReviewDto dto) throws IOException {
        return apiResponse.getSingleResult(reviewService.insertReview(dto));
    }

}
