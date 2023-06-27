package ca.babpool.mapper;

import ca.babpool.model.dto.restaurant.RestaurantDto;
import ca.babpool.model.dto.restaurant.RestaurantFcmDto;
import ca.babpool.model.dto.restaurant.RestaurantResponseDto;
import ca.babpool.model.dto.restaurant.RestaurantStatusRequestDto;
import ca.babpool.model.dto.review.ReviewDto;
import ca.babpool.model.entity.Restaurant;
import org.apache.ibatis.annotations.*;
import org.springframework.security.core.parameters.P;

import java.util.List;

/**
 * 1. 레스토랑 생성
 * 2. 레스토랑 상세정보 확인하기
 * 3. 레스토랑 정보 수정
 * 4. 오너 레스토랑 전체 불러오기
 *
 * 레스토랑 삭제는 관리자가 할 것
 */
@Mapper
public interface RestaurantMapper {

    int createRestaurant(Restaurant restaurant);

    Restaurant selectRestaurantDetail(Long restaurantId);

    /**
     * content, phone, minPrice, deliveryType, photo, deliveryarea, closeDay,
     * @param restaurant
     * @return
     */
    int updateRestaurant(Restaurant restaurant);

    int deleteRestaurant(Long restaurantId);

    List<RestaurantDto> getAllRestaurant(String memberId);

    RestaurantResponseDto selectRestaurantInformationsDetail(@Param("restaurantId") Long restaurantId,@Param("memberId") String memberId);

    List<RestaurantDto> selectRestaurantCategory(String restaurantCategory);

    List<RestaurantDto> selectSearchResult(String searchValue);

    List<RestaurantDto> selectRatingSortResult(String searchValue);

    List<RestaurantDto> selectMinPriceSortResult(String searchValue);

    List<RestaurantDto> selectDeliveryTimeSortResult(String searchValue);

    List<RestaurantDto> selectDistanceSortResult(String searchValue, Double memberLatitude, Double memberLongitude);

    List<RestaurantDto> selectReplySortResult(String searchValue);

    int updateRestaurantStatusByIdList(RestaurantStatusRequestDto dto);

    int insertRestaurantDeliveryTip(@Param("restaurantRdTip") String restaurantRdTip, @Param("restaurantId") Long restaurantId);

    RestaurantFcmDto findMemberIdAndRestaurantNameByRestaurantId(Long restaurantId);

    int updateRestaurantReply(ReviewDto dto);

    int updateRestaurantRating(ReviewDto dto);

    int updataRefund(Long ordersId);
}
