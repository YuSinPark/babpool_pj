package ca.babpool.service;

import ca.babpool.mapper.MenuMapper;
import ca.babpool.model.dto.menu.MenuDto;
import ca.babpool.model.entity.Menu;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuMapper mapper;
    private final ImgUploadService imgUploadService;

    @Override
    public List<MenuDto> selectMenuByRestaurantId(Long restaurantId) {
        return mapper.selectMenuByRestaurantId(restaurantId);
    }

    @Override
    public int updateMenu(MenuDto menuDto) {
        Menu menu = Menu.toEntity(menuDto);
        return mapper.updateMenu(menu);
    }

    @Override
    public int insertMenu(MenuDto dto) throws IOException {
        if (dto.getMenuPhoto() == null) {
            dto.setMenuPhoto("null");
        } else {
            dto.setMenuPhoto(imgUploadService.uploadBase64ImageToS3(dto.getMenuPhoto()));
        }
        Menu menu = Menu.toEntity(dto);
        return mapper.insertMenu(menu);
    }

    @Override
    public List<MenuDto> selectRepresentativeMenu(Long restaurantId) {
        return mapper.selectRepresentativeMenu(restaurantId);
    }

    @Override
    public int updateRepresentativeMenu(Map<String, List<Long>> menuIdList) {
        List<Long> idList = menuIdList.get("checkedMenuIds");
        int updateCount = 0;
        for (Long menuId : idList) {
            mapper.updateRepresentativeMenu(menuId);
            updateCount += 1;
        }
        return updateCount;
    }

    @Override
    public int deleteMenuByMenuId(Map<String, Long> menuId) {
        Long id = menuId.get("menuId");
        return mapper.deleteMenuByMenuId(id);
    }
    @Override
    public List<MenuDto> selectAllMenuByRestaurantId(Long restaurantId) {
        return mapper.selectAllMenuByRestaurantId(restaurantId);
    }

    @Override
    public List<MenuDto> selectHideOrSoldOutMenu(Long restaurantId) {
        List<Menu> menuList = mapper.selectHideOrSoldOutMenu(restaurantId);
        List<MenuDto> menuDtoList = new ArrayList<>();

        for (Menu menu : menuList) {
            MenuDto dto = MenuDto.toDTO(menu);
            menuDtoList.add(dto);
        }

        return menuDtoList;
    }
}
