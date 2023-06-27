package ca.babpool.model.dto.restaurant;


import lombok.*;

@Getter
@Setter
public class RestaurantResponseDto {

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

    private String rdTimeMin;

    private String rdTimeMax;

    private String rdTimeAvg;

    private String rdPickupTimeMin;

    private String rdPickupTimeMax;

    private String rdPickupTimeAvg;

    private String rdTip;

    private String rdType;

    private String rdArea;

    private String memberNickName;

    private Long reviewCount;

    private Long reviewCommentCount;

    private Long likesId;

    private Long orderCount;



}
