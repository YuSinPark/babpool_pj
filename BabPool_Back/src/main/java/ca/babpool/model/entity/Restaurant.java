package ca.babpool.model.entity;

import ca.babpool.model.dto.restaurant.RestaurantDto;
import ca.babpool.model.dto.restaurant.RestaurantRegisterRequestDto;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Restaurant {
    private Long restaurantId;
    private String memberId;
    private String restaurantCategory;
    private String restaurantName;
    private String restaurantContent;
    private String restaurantAddress;
    private String restaurantPhone;
    private Double restaurantRating;
    private String restaurantReply;
    private String restaurantMinPrice;
    private String restaurantPhoto;
    private String restaurantCloseDay;
    private Long restaurantLikeCount;
    private String restaurantOrigin;
    private String restaurantLicenseNumber;
    private Double restaurantLatitude;
    private Double restaurantLongitude;
    private String restaurantStatus;
    private String restaurantNotice;
    private String restaurantDetailAddress;

    public static Restaurant toEntity(RestaurantDto dto) {
        return Restaurant.builder()
                .restaurantId(dto.getRestaurantId())
                .memberId(dto.getMemberId())
                .restaurantCategory(dto.getRestaurantCategory())
                .restaurantName(dto.getRestaurantName())
                .restaurantContent(dto.getRestaurantContent())
                .restaurantAddress(dto.getRestaurantAddress())
                .restaurantPhone(dto.getRestaurantPhone())
                .restaurantRating(dto.getRestaurantRating())
                .restaurantReply(dto.getRestaurantReply())
                .restaurantMinPrice(dto.getRestaurantMinPrice())
                .restaurantPhoto(dto.getRestaurantPhoto())
                .restaurantCloseDay(dto.getRestaurantCloseDay())
                .restaurantLikeCount(dto.getRestaurantLikeCount())
                .restaurantOrigin(dto.getRestaurantOrigin())
                .restaurantLicenseNumber(dto.getRestaurantLicenseNumber())
                .restaurantLatitude(dto.getRestaurantLatitude())
                .restaurantLongitude(dto.getRestaurantLongitude())
                .restaurantStatus(dto.getRestaurantStatus())
                .restaurantNotice(dto.getRestaurantNotice())
                .restaurantDetailAddress(dto.getRestaurantDetailAddress())
                .build();
    }

    public static Restaurant toEntity(RestaurantRegisterRequestDto dto) {
        return Restaurant.builder()
                .restaurantId(dto.getRestaurantId())
                .memberId(dto.getMemberId())
                .restaurantCategory(dto.getRestaurantCategory())
                .restaurantName(dto.getRestaurantName())
                .restaurantAddress(dto.getRestaurantAddress())
                .restaurantPhone(dto.getRestaurantPhone())
                .restaurantMinPrice(dto.getRestaurantMinPrice())
                .restaurantPhoto(dto.getRestaurantPhoto())
                .restaurantLicenseNumber(dto.getRestaurantLicenseNumber())
                .restaurantLatitude(dto.getRestaurantLatitude())
                .restaurantLongitude(dto.getRestaurantLongitude())
                .restaurantDetailAddress(dto.getRestaurantDetailAddress())
                .build();
    }
}
