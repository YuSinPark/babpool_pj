package ca.babpool.service;

import ca.babpool.mapper.LikeMapper;
import ca.babpool.model.dto.LikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
    private final SqlSession sqlSession;
    private final LikeMapper mapper;

    @Override
    public List<LikeDto> selectLikeForMember(String memberId) {
        return mapper.selectLikeForMember(memberId);
    }

    @Override
    public Long createLikeForMember(String memberId ,Long restaurantId){
        sqlSession.update("updateLikeUp",restaurantId);
        return mapper.createLikes(memberId,restaurantId);
    }

    @Override
    public int deleteLikeForMember(LikeDto likes){
        Long restaurantId = likes.getRestaurantId();
        sqlSession.update("updateLikeDown",restaurantId);
        return mapper.deleteLikes(likes);
    }
}
