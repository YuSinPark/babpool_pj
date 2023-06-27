package ca.babpool.model.entity;

import ca.babpool.model.dto.review.ReviewCommentDto;
import lombok.*;
@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewComment {

    private Long reviewcommentId;
    private Long reviewId;
    private String reviewcommentContent;
    private String memberId;

    public static ReviewComment toEntity(ReviewCommentDto dto) {
        return ReviewComment.builder()
                .reviewcommentId(dto.getReviewcommentId())
                .reviewId(dto.getReviewId())
                .reviewcommentContent(dto.getReviewcommentContent())
                .memberId(dto.getMemberId())
                .build();
    }
}
