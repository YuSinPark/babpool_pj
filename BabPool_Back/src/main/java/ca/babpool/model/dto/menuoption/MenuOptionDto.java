package ca.babpool.model.dto.menuoption;


import ca.babpool.model.entity.MenuOption;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString
@AllArgsConstructor
public class MenuOptionDto {

    private Long menuOptionId;

    private String menuOptionCategory;

    private String menuOptionName;

    private String menuOptionPrice;

    public static MenuOptionDto toDTO(MenuOption entity){
        return MenuOptionDto.builder()
                .menuOptionCategory(entity.getMenuOptionCategory())
                .menuOptionName(entity.getMenuOptionName())
                .menuOptionPrice(entity.getMenuOptionPrice())
                .menuOptionCategory(entity.getMenuOptionCategory())
                .build();
    }
}
