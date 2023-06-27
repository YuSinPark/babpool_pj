package ca.babpool.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface KakaopayMapper {
    int updataCancel(Long ordersId);
}
