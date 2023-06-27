package ca.babpool.model.dto;

import ca.babpool.model.entity.Like;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString

public class LikeDto {
    private Long likesId;
    private String memberId;
    private Long restaurantId;


    public LikeDto(Long likesId, String memberId, Long restaurantId) {

        this.likesId = likesId;
        this.memberId = memberId;
        this.restaurantId = restaurantId;
    }


    public static LikeDto toDTO(Like entity) {
        return LikeDto.builder()
                .likesId(entity.getLikesId())
                .restaurantId(entity.getRestaurantId())
                .memberId(entity.getMemberId())
                .build();
    }
    public static Like toEntity(LikeDto dto) {
        return Like.builder()
                .likesId(dto.getLikesId())
                .memberId(dto.getMemberId())
                .restaurantId(dto.getRestaurantId())
                .build();
    }
}
