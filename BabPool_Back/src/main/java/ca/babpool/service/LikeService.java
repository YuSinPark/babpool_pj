package ca.babpool.service;

import ca.babpool.model.dto.LikeDto;

import java.util.List;

public interface LikeService {


    List<LikeDto> selectLikeForMember(String memberId);

    Long createLikeForMember(String memberId, Long restaurantId);

    int deleteLikeForMember(LikeDto likes);
}
