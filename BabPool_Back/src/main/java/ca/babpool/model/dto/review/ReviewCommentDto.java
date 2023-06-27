package ca.babpool.model.dto.review;

import ca.babpool.model.entity.ReviewComment;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCommentDto {

    private Long reviewcommentId;
    private Long reviewId;
    private String reviewcommentContent;
    private String memberId;

    public static ReviewCommentDto toDto(ReviewComment entity) {
        return ReviewCommentDto.builder()
                .reviewcommentId(entity.getReviewcommentId())
                .reviewId(entity.getReviewId())
                .reviewcommentContent(entity.getReviewcommentContent())
                .memberId(entity.getMemberId())
                .build();
    }
}
