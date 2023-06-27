//package ca.babpool.restauranttest;
//
//import ca.babpool.mapper.MenuMapper;
//import ca.babpool.model.dto.menu.MenuDto;
//import ca.babpool.model.entity.Menu;
//import ca.babpool.sevice.ImgUploadService;
//import ca.babpool.sevice.MenuServiceImpl;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import static org.mockito.BDDMockito.given;
//
//public class MenuTest {
//    @Mock
//    private ImgUploadService imgUploadService;
//    @Mock
//    private MenuMapper menuMapper;
//    @InjectMocks
//    private MenuServiceImpl menuService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//        menuService = new MenuServiceImpl(menuMapper, imgUploadService);
//    }
//
//    @Test
//    void testSelectHideOrSoldOutMenu() {
//        // given
//        Long restaurantId = 52L;
//        List<Menu> menus = List.of(
//                Menu.builder().restaurantId(restaurantId).menuId(10L).menuStatus("Y").build(),
//                Menu.builder().restaurantId(restaurantId).menuId(12L).menuStatus("N").build(),
//                Menu.builder().restaurantId(restaurantId).menuId(11L).menuStatus("H").build()
//        );
//        given(menuMapper.selectHideOrSoldOutMenu(restaurantId)).willReturn(menus.stream()
//                .filter(menu -> !menu.getMenuStatus().equals("Y"))
//                .collect(Collectors.toList()));
//
//        // when
//        List<MenuDto> menuDtoList = menuService.selectHideOrSoldOutMenu(restaurantId);
//
//        // then
//        Assertions.assertEquals(2, menuDtoList.size());
//        MenuDto menuDto1 = menuDtoList.get(0);
//        MenuDto menuDto2 = menuDtoList.get(1);
////        Assertions.assertEquals(12L, menuDto1.getMenuId());
////        Assertions.assertEquals(11L, menuDto2.getMenuId());
//    }
//}
//
