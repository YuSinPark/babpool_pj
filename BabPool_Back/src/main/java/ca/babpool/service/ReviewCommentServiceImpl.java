package ca.babpool.service;

import ca.babpool.mapper.ReviewCommentMapper;
import ca.babpool.model.dto.review.ReviewCommentDto;
import ca.babpool.model.entity.ReviewComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewCommentServiceImpl implements ReviewCommentService {

    private final ReviewCommentMapper mapper;

    @Override
    public int insertOwnerComment(ReviewCommentDto dto) {
        return mapper.insertReviewComment(ReviewComment.toEntity(dto));
    }

    @Override
    public int deleteOwnerComment(Long reviewcommentId) {
        return mapper.deleteReviewComment(reviewcommentId);
    }

}
