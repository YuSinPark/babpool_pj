package ca.babpool.mapper;

import ca.babpool.model.dto.menuoption.MenuOptionDto;
import ca.babpool.model.dto.menuoption.OwnerMenuOptionRequestDto;
import ca.babpool.model.dto.menuoption.OwnerMenuOptionResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MenuOptionMapper {
    List<OwnerMenuOptionResponseDto> findMenuOptionByRestaurantId(Long restaurantId);

    Long addMenuOption(OwnerMenuOptionRequestDto dto);

    List<Long> findMenuIdByMenuOptionId(Long menuOptionId);

    int updateMenuOption(OwnerMenuOptionRequestDto dto);

    int deleteMenuOption(Long menuOptionId);
    List<MenuOptionDto> selectMenuOptionByMenuId(Long menuId);
}
