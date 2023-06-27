package ca.babpool.model.dto;

import ca.babpool.model.entity.Search;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString
@AllArgsConstructor
public class SearchDto {
    private Long searchCount;
    private String searchValue;
    private String searchUpdate;

    public static SearchDto toDTO(Search entity) {
        return builder().searchCount(entity.getSearchCount()).searchValue(entity.getSearchValue()).searchUpdate(entity.getSearchUpdate()).build();
    }
}
