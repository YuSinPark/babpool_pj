package ca.babpool.model.dto.menu;

import ca.babpool.model.entity.Menu;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString
@AllArgsConstructor
public class MenuDto {
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



    public static MenuDto toDTO(Menu entity) {
        return MenuDto.builder()
                .menuId(entity.getMenuId())
                .restaurantId(entity.getRestaurantId())
                .menuCategory(entity.getMenuCategory())
                .menuName(entity.getMenuName())
                .menuContent(entity.getMenuContent())
                .menuPrice(entity.getMenuPrice())
                .menuStatus(entity.getMenuStatus())
                .menuPhoto(entity.getMenuPhoto())
                .menuGroup(entity.getMenuGroup())
                .menuRepresentative(entity.getMenuRepresentative())
                .build();
    }

}
