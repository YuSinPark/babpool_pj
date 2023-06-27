package ca.babpool.mapper;

import ca.babpool.model.entity.ReviewComment;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewCommentMapper {
    int insertReviewComment(ReviewComment entity);

    int deleteReviewComment(Long reviewCommentId);
}
