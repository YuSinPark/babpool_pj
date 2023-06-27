package ca.babpool.mapper;

import ca.babpool.model.dto.orders.OrdersDto;
import ca.babpool.model.dto.review.ReviewDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrdersMapper {

    Long addOrders(OrdersDto dto);

    String findMemberIdByOrdersId(Long ordersId);

    int updateReviewStatus(ReviewDto dto);
}
