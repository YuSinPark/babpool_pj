package ca.babpool.model.dto.review;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponseDto {
    private Long reviewId;
    private String reviewMenu;
    private String menuName;
    private String memberId;
    private Double reviewRating;
    private String reviewContent;
    private String reviewPhoto;
    private String reviewCreateDate;
    private String reviewModifiedDate;
    private Long restaurantId;
    private String restaurantName;
    private String memberNickname;
    private String reviewCommentContent;
    private String reviewCommentId;
//    private String menuName;
}
