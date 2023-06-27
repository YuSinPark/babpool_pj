//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.service;

import ca.babpool.model.dto.restaurant.RestaurantDto;
import ca.babpool.model.dto.SearchDto;

import java.util.List;

public interface SearchService {

    int updateSearch(SearchDto searchDto);

    int createSearch(SearchDto searchDto);

    List<RestaurantDto> findBySearch(String searchValue);

    List<RestaurantDto> findByRatingSort(String searchValue);

    List<RestaurantDto> findByMinPriceSort(String searchValue);

    List<SearchDto> findByPopularSort();

    List<RestaurantDto> findByDeliveryTimeSort(String searchValue);

    List<RestaurantDto> findByReplySort(String searchValue);

    List<RestaurantDto> findByDistanceSort(String searchValue, Double memberLatitude, Double memberLongitude);

}

