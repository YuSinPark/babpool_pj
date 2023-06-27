package ca.babpool.model.dto.review;

import ca.babpool.model.entity.Review;
import lombok.*;

@Getter
@NoArgsConstructor
@Builder
@Setter
@ToString
public class ReviewDto {
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

    public ReviewDto(Long reviewId, Long ordersId, String reviewMenu, String memberId, Double reviewRating, String reviewContent, String reviewPhoto, String reviewCreateDate, String reviewModifiedDate, Long restaurantId) {
        this.reviewId = reviewId;
        this.ordersId = ordersId;
        this.reviewMenu = reviewMenu;
        this.memberId = memberId;
        this.reviewRating = reviewRating;
        this.reviewContent = reviewContent;
        this.reviewPhoto = reviewPhoto;
        this.reviewCreateDate = reviewCreateDate;
        this.reviewModifiedDate = reviewModifiedDate;
        this.restaurantId = restaurantId;
    }


    public static ReviewDto toDTO(Review entity) {
        return ReviewDto.builder()
                .reviewId(entity.getReviewId())
                .ordersId(entity.getOrdersId())
                .reviewMenu(entity.getReviewMenu())
                .reviewRating(entity.getReviewRating())
                .reviewContent(entity.getReviewContent())
                .reviewPhoto(entity.getReviewPhoto())
                .reviewCreateDate(entity.getReviewCreateDate())
                .reviewModifiedDate(entity.getReviewModifiedDate())
                .restaurantId(entity.getRestaurantId())
                .memberId(entity.getMemberId())
                .build();
    }
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
