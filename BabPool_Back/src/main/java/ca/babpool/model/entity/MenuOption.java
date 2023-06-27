package ca.babpool.model.entity;

import ca.babpool.model.dto.menuoption.MenuOptionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuOption {
    private Long menuOptionId;

    private String menuOptionName;

    private String menuOptionPrice;

    private String menuOptionCategory;

    public static MenuOption toEntity(MenuOptionDto dto){
        return MenuOption.builder()
                .menuOptionCategory(dto.getMenuOptionCategory())
                .menuOptionName(dto.getMenuOptionName())
                .menuOptionPrice(dto.getMenuOptionPrice())
                .menuOptionCategory(dto.getMenuOptionCategory())
                .build();
    }
}
