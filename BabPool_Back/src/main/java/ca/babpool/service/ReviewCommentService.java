package ca.babpool.service;

import ca.babpool.model.dto.review.ReviewCommentDto;

public interface ReviewCommentService {

    int insertOwnerComment(ReviewCommentDto dto);

    int deleteOwnerComment(Long reviewcommentId);

}
