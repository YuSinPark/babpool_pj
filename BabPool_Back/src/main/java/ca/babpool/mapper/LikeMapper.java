package ca.babpool.mapper;

import ca.babpool.model.dto.LikeDto;
import ca.babpool.model.dto.LikeRequestDto;
import ca.babpool.model.response.SingleResult;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LikeMapper {

    List<LikeDto> selectLikeForMember(String memberId);

    Long createLikes(@Param("memberId") String memberId,@Param("restaurantId") Long restaurantId);

    int deleteLikes(LikeDto likes);
}
