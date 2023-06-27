package ca.babpool.mapper;

import ca.babpool.model.dto.menu.MenuDto;
import ca.babpool.model.entity.Menu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper {

    List<MenuDto> selectMenuByRestaurantId(Long restaurantId);
    
    int updateMenu(Menu entity);

    int insertMenu(Menu menu);

    List<MenuDto> selectRepresentativeMenu(Long restaurantId);

    int updateRepresentativeMenu(Long menuId);

    int deleteMenuByMenuId(Long menuId);

    List<MenuDto> selectAllMenuByRestaurantId(Long restaurantId);
    List<Menu> selectHideOrSoldOutMenu(Long restaurantId);
}
