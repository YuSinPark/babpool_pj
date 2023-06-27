package ca.babpool.model.entity;

import ca.babpool.model.dto.review.ReviewDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private Long reviewId;
    private Long ordersId;
    private String reviewMenu;
    private String memberId;
    private Double reviewRating;
    private String reviewContent;
    private String reviewPhoto;
    private String reviewCreateDate;
    private String reviewModifiedDate;
    private Long restaurantId;

    public static Review toEntity(ReviewDto dto) {
        return Review.builder()
                .reviewId(dto.getReviewId())
                .ordersId(dto.getOrdersId())
                .reviewMenu(dto.getReviewMenu())
                .memberId(dto.getMemberId())
                .reviewRating(dto.getReviewRating())
                .reviewContent(dto.getReviewContent())
                .reviewPhoto(dto.getReviewPhoto())
                .reviewCreateDate(dto.getReviewCreateDate())
                .reviewModifiedDate(dto.getReviewModifiedDate())
                .restaurantId(dto.getRestaurantId())
                .build();
    }
}
