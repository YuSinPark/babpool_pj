//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.controller;

import ca.babpool.model.dto.restaurant.RestaurantDto;
import ca.babpool.model.dto.SearchDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping({"api/v1/search"})
public class SearchController {
    private final SearchService searchService;
    private final ApiResponse apiResponse;

    @Operation(summary = "검색어 업데이트")
    @PostMapping("/create")
    public SingleResult<Integer> updateValue(@RequestBody SearchDto searchDto) {
        return apiResponse.getSingleResult(searchService.createSearch(searchDto));
    }

    @Operation(summary = "검색 횟수 업데이트")
    @PostMapping("/count")
    public SingleResult<Integer> updateCount(@RequestBody SearchDto searchDto) {
        return apiResponse.getSingleResult(searchService.updateSearch(searchDto));
    }

    @Operation(
            summary = "인기검색어"
    )
    @GetMapping("/popular")
    public ListResult<SearchDto> popularSort() {
        return apiResponse.getListResult(searchService.findByPopularSort());
    }


    @Operation(
            summary = "검색"
    )
    @GetMapping({""})
    public ListResult<RestaurantDto> restaurantDetails(@RequestParam("searchValue") String searchValue) {
        return apiResponse.getListResult(searchService.findBySearch(searchValue));
    }

    @Operation(
            summary = "별점순정렬검색"
    )
    @GetMapping({"rating"})
    public ListResult<RestaurantDto> ratingSort(@RequestParam("searchValue") String searchValue) {
        return apiResponse.getListResult(searchService.findByRatingSort(searchValue));
    }

    @Operation(
            summary = "최소주문금액순정렬검색"
    )
    @GetMapping({"minPrice"})
    public ListResult<RestaurantDto> minPriceSort(@RequestParam("searchValue") String searchValue) {
        return apiResponse.getListResult(searchService.findByMinPriceSort(searchValue));
    }

    @Operation(
            summary = "배달시간순정렬검색"
    )
    @GetMapping({"deliveryTime"})
    public ListResult<RestaurantDto> deliveryTimeSort(@RequestParam("searchValue") String searchValue) {
        return apiResponse.getListResult(searchService.findByDeliveryTimeSort(searchValue));
    }

    @Operation(
            summary = "리뷰순정렬검색"
    )
    @GetMapping({"reply"})
    public ListResult<RestaurantDto> replySort(@RequestParam("searchValue") String searchValue) {
        return apiResponse.getListResult(searchService.findByReplySort(searchValue));
    }

    @Operation(
            summary = "거리순정렬검색"
    )
    @GetMapping("/distance")
    public ListResult<RestaurantDto> searchByDistanceSort(@RequestParam("searchValue") String searchValue, @RequestParam("memberLatitude") Double memberLatitude, @RequestParam("memberLongitude") Double memberLongitude) {
        return apiResponse.getListResult(searchService.findByDistanceSort(searchValue, memberLatitude, memberLongitude));
    }



}
