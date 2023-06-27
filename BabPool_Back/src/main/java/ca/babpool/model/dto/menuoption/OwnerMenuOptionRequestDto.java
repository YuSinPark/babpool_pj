package ca.babpool.model.dto.menuoption;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class OwnerMenuOptionRequestDto {
    private Long menuOptionId;
    private List<Long> menuId;
    private String menuOptionCategory;
    private String menuOptionName;
    private Long menuOptionPrice;
}
