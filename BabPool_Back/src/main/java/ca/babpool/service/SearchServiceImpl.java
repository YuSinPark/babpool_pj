//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.service;

import ca.babpool.mapper.RestaurantMapper;
import ca.babpool.mapper.SearchMapper;
import ca.babpool.model.dto.restaurant.RestaurantDto;
import ca.babpool.model.dto.SearchDto;
import ca.babpool.model.entity.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    private final RestaurantMapper mapper;
    private final SearchMapper searchMapper;

    public int createSearch(SearchDto searchDto) {
        return this.searchMapper.createSearch(Search.toEntity(searchDto));
    }

    public int updateSearch(SearchDto searchDto) {
        return this.searchMapper.updateSearch(Search.toEntity(searchDto));
    }

    public List<RestaurantDto> findBySearch(String searchValue) {
        if (mapper.selectSearchResult(searchValue).size() == 0) {
            throw new NullPointerException("일치하는 가게가 없습니다.");
        } else {
            return mapper.selectSearchResult(searchValue);
        }
    }


    public List<RestaurantDto> findByRatingSort(String searchValue) {
        if (mapper.selectRatingSortResult(searchValue).size() == 0) {
            throw new NullPointerException("일치하는 가게가 없습니다.");
        } else {
            return mapper.selectRatingSortResult(searchValue);
        }
    }

    public List<RestaurantDto> findByMinPriceSort(String searchValue) {
        if (mapper.selectMinPriceSortResult(searchValue).size() == 0) {
            throw new NullPointerException("일치하는 가게가 없습니다.");
        } else {
            return mapper.selectMinPriceSortResult(searchValue);
        }
    }

    public List<SearchDto> findByPopularSort() {
        return searchMapper.selectPopularSortResult();
    }


    public List<RestaurantDto> findByDeliveryTimeSort(String searchValue) {
        if (mapper.selectDeliveryTimeSortResult(searchValue).size() == 0) {
            throw new NullPointerException("일치하는 가게가 없습니다.");
        } else {
            return mapper.selectDeliveryTimeSortResult(searchValue);
        }
    }

    public List<RestaurantDto> findByDistanceSort(String searchValue, Double memberLatitude, Double memberLongitude) {
        if (mapper.selectDistanceSortResult(searchValue, memberLatitude, memberLongitude).size() == 0) {
            throw new NullPointerException("일치하는 가게가 없습니다.");
        } else {
            return mapper.selectDistanceSortResult(searchValue, memberLatitude, memberLongitude);
        }
    }



    public List<RestaurantDto> findByReplySort(String searchValue) {
        if (mapper.selectReplySortResult(searchValue).size() == 0) {
            throw new NullPointerException("일치하는 가게가 없습니다.");
        } else {
            return mapper.selectReplySortResult(searchValue);
        }
    }

}
