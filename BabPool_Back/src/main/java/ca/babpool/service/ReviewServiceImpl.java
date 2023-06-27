package ca.babpool.service;

import ca.babpool.mapper.MemberMapper;
import ca.babpool.mapper.OrdersMapper;
import ca.babpool.mapper.RestaurantMapper;
import ca.babpool.mapper.ReviewMapper;
import ca.babpool.model.dto.review.ReviewResponseDto;
import ca.babpool.model.dto.review.ReviewDto;
import ca.babpool.model.entity.Review;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.jdbc.Null;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
    private final ReviewMapper mapper;
    private final RestaurantMapper restaurantMapper;
    private final OrdersMapper ordersMapper;
    private final ImgUploadService imgUploadService;
    private final MemberMapper memberMapper;


    @Override
    @Transactional
    public int insertReview(ReviewDto dto) throws IOException {

        if (dto.getReviewPhoto() != null) {
            dto.setReviewPhoto(imgUploadService.uploadBase64ImageToS3(dto.getReviewPhoto()));
       
        }
        int reviewInsert = mapper.insertReview(Review.toEntity(dto));
        // 리뷰 카운트 업데이트

        restaurantMapper.updateRestaurantReply(dto);
        // 리뷰 별점 업데이트
        restaurantMapper.updateRestaurantRating(dto);

        ordersMapper.updateReviewStatus(dto);

        // 멤버 리뷰 포인트 증가
        memberMapper.earnPoints(dto.getMemberId());

        return reviewInsert;
    }



    @Override
    public List<ReviewDto> getRestaurantReview(Long restaurantId){
        return mapper.getRestaurantReview(restaurantId);
    }

    @Override
    public List<ReviewResponseDto> selectReviewForOwner(Long restaurantId, int offset, int limit) {
        return mapper.selectReviewForOwner(offset, limit, restaurantId);
    }

    @Override
    public List<ReviewResponseDto> selectReviewForMember(String memberId) {
        return mapper.selectReviewForMember(memberId);
    }

    @Override
    public int getReviewCommentCount(Long restaurantId){
        return mapper.getReviewCommentCount(restaurantId);
    }

    @Override
    public int deleteMyReview(Long reviewId) {
        return mapper.deleteMyReview(reviewId);
    }

    @Override
    public List<ReviewDto> getOwnerRestaurantReview(Long restaurantId){
        return mapper.getRestaurantReview(restaurantId);
    }
}
