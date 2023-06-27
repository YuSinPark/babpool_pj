//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.mapper;

import ca.babpool.model.dto.SearchDto;
import ca.babpool.model.entity.Search;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SearchMapper {
    int createSearch(Search search);

    int updateSearch(Search search);

    List<SearchDto> selectPopularSortResult();

}
