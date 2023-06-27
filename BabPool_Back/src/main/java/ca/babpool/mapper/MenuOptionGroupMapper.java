package ca.babpool.mapper;

import ca.babpool.model.dto.menuoptiongroup.MenuOptionGroupDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MenuOptionGroupMapper {

    int addMenuOptionGroup(@Param("menuId") Long menuId, @Param("menuOptionId") Long menuOptionId);

    int deleteMenuOptionGroup(@Param("menuId") Long menuId, @Param("menuOptionId") Long menuOptionId);
}
