package ca.babpool.model.entity;


import ca.babpool.model.dto.menu.MenuDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Menu {

    private Long menuId;

    private Long restaurantId;

    private String menuCategory;

    private String menuName;

    private String menuContent;

    private String menuPrice;

    private String menuStatus;

    private String menuPhoto;

    private String menuGroup;

    private int menuRepresentative;


    public static Menu toEntity(MenuDto dto) {
        return Menu.builder()
                .menuId(dto.getMenuId())
                .restaurantId(dto.getRestaurantId())
                .menuCategory(dto.getMenuCategory())
                .menuName(dto.getMenuName())
                .menuContent(dto.getMenuContent())
                .menuPrice(dto.getMenuPrice())
                .menuStatus(dto.getMenuStatus())
                .menuPhoto(dto.getMenuPhoto())
                .menuGroup(dto.getMenuGroup())
                .menuRepresentative(dto.getMenuRepresentative())
                .build();
    }

}
