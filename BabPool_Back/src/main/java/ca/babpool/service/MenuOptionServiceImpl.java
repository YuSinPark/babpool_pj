package ca.babpool.service;

import ca.babpool.mapper.MenuOptionGroupMapper;
import ca.babpool.mapper.MenuOptionMapper;
import ca.babpool.model.dto.menuoption.MenuOptionDto;
import ca.babpool.model.dto.menuoption.OwnerMenuOptionRequestDto;
import ca.babpool.model.dto.menuoption.OwnerMenuOptionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class MenuOptionServiceImpl implements MenuOptionService {
    private final MenuOptionMapper menuOptionMapper;
    private final MenuOptionGroupMapper menuOptionGroupMapper;

    @Override
    @Transactional
    public List<OwnerMenuOptionResponseDto> findMenuOptionByRestaurantId(Long restaurantId) {
        List<OwnerMenuOptionResponseDto> dtoList = menuOptionMapper.findMenuOptionByRestaurantId(restaurantId);

        for (OwnerMenuOptionResponseDto dto : dtoList) {
            Long menuOptionId = dto.getMenuOptionId();
            List<Long> menuIdList = menuOptionMapper.findMenuIdByMenuOptionId(menuOptionId);
            dto.setMenuId(menuIdList);
        }
        return dtoList;
    }

    @Override
    @Transactional
    public int addMenuOptionAndMenuOptionGroup(OwnerMenuOptionRequestDto dto, Long restaurantId) {
        menuOptionMapper.addMenuOption(dto);
        Long menuOptionId = dto.getMenuOptionId();
        List<Long> menuIdList = dto.getMenuId();

        int cnt=0;

        for (Long id  : menuIdList) {
            menuOptionGroupMapper.addMenuOptionGroup(id, menuOptionId);
            cnt += 1;
        }
        return cnt;
    }

    @Override
    @Transactional
    public int updateMenuOption(OwnerMenuOptionRequestDto dto, Long restaurantId) {
        int updateCnt = 0;
        updateCnt += menuOptionMapper.updateMenuOption(dto);

        Long menuOptionId = dto.getMenuOptionId();
        List<Long> preMenuIdList = menuOptionMapper.findMenuIdByMenuOptionId(menuOptionId);
        List<Long> menuIdList = dto.getMenuId();

        List<Long> deleteMenuIdList = preMenuIdList.stream()
                .filter(pre -> menuIdList.stream().noneMatch(Predicate.isEqual(pre)))
                .collect(Collectors.toList());

        for (Long deleteMenuId : deleteMenuIdList) {
            updateCnt += menuOptionGroupMapper.deleteMenuOptionGroup(deleteMenuId, menuOptionId);
        }

        List<Long> newMenuIdList = menuIdList.stream()
                .filter(post -> preMenuIdList.stream().noneMatch(Predicate.isEqual(post)))
                .collect(Collectors.toList());

        for (Long newMenuId : newMenuIdList) {
            updateCnt += menuOptionGroupMapper.addMenuOptionGroup(newMenuId, menuOptionId);
        }

        if (menuIdList.size() == 0) {
            menuOptionMapper.deleteMenuOption(menuOptionId);
        }

        return updateCnt;
    }
    @Override
    public List<MenuOptionDto> selectMenuOptionByMenuId(Long menuId){
        return menuOptionMapper.selectMenuOptionByMenuId(menuId);
    }
}
