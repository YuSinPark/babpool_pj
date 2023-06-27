package ca.babpool.model.dto.restaurant;

import ca.babpool.model.entity.Restaurant;
import lombok.*;

@Getter
@NoArgsConstructor
@Builder
@Setter
@ToString
@AllArgsConstructor
public class RestaurantDto {
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

    public static RestaurantDto toDTO(Restaurant entity) {
        return RestaurantDto.builder()
                .restaurantId(entity.getRestaurantId())
                .memberId(entity.getMemberId())
                .restaurantCategory(entity.getRestaurantCategory())
                .restaurantName(entity.getRestaurantName())
                .restaurantContent(entity.getRestaurantContent())
                .restaurantAddress(entity.getRestaurantAddress())
                .restaurantPhone(entity.getRestaurantPhone())
                .restaurantRating(entity.getRestaurantRating())
                .restaurantReply(entity.getRestaurantReply())
                .restaurantMinPrice(entity.getRestaurantMinPrice())
                .restaurantPhoto(entity.getRestaurantPhoto())
                .restaurantCloseDay(entity.getRestaurantCloseDay())
                .restaurantLikeCount(entity.getRestaurantLikeCount())
                .restaurantOrigin(entity.getRestaurantOrigin())
                .restaurantLicenseNumber(entity.getRestaurantLicenseNumber())
                .restaurantLatitude(entity.getRestaurantLatitude())
                .restaurantLongitude(entity.getRestaurantLongitude())
                .restaurantStatus(entity.getRestaurantStatus())
                .restaurantNotice(entity.getRestaurantNotice())
                .restaurantDetailAddress(entity.getRestaurantDetailAddress())
                .build();
    }
}
