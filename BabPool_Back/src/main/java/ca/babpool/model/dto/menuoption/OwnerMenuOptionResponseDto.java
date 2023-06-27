package ca.babpool.model.dto.menuoption;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString
@AllArgsConstructor
public class OwnerMenuOptionResponseDto {

    private Long menuOptionId;

    private String menuOptionName;

    private String menuOptionPrice;

    private String menuOptionCategory;

    private List<Long> menuId;
}