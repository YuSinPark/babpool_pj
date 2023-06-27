package ca.babpool.service;

import ca.babpool.model.dto.menuoption.MenuOptionDto;
import ca.babpool.model.dto.menuoption.OwnerMenuOptionRequestDto;
import ca.babpool.model.dto.menuoption.OwnerMenuOptionResponseDto;

import java.util.List;

public interface MenuOptionService {
    List<OwnerMenuOptionResponseDto> findMenuOptionByRestaurantId(Long restaurantId);

    int addMenuOptionAndMenuOptionGroup(OwnerMenuOptionRequestDto dto, Long restaurantId);

    int updateMenuOption(OwnerMenuOptionRequestDto dto, Long restaurantId);

    List<MenuOptionDto> selectMenuOptionByMenuId(Long menuId);
}
