package ca.babpool.service;

import ca.babpool.model.dto.menu.MenuDto;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface MenuService {
    List<MenuDto> selectMenuByRestaurantId(Long restaurantId);
    int updateMenu(MenuDto dto);

    int insertMenu(MenuDto dto) throws IOException;

    List<MenuDto> selectRepresentativeMenu(Long restaurantId);

    int updateRepresentativeMenu(Map<String, List<Long>> menuIdList);

    int deleteMenuByMenuId(Map<String, Long> menuId);

    List<MenuDto> selectAllMenuByRestaurantId(Long restaurantId);
    List<MenuDto> selectHideOrSoldOutMenu(Long restaurantId);

}
