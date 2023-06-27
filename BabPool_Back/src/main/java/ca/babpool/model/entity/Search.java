package ca.babpool.model.entity;


import ca.babpool.model.dto.SearchDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Search {

    private Long searchCount;
    private String searchValue;
    private String searchUpdate;

    public static Search toEntity(SearchDto dto) {
        return builder().searchCount(dto.getSearchCount()).searchValue(dto.getSearchValue()).searchUpdate(dto.getSearchUpdate()).build();
    }

}
