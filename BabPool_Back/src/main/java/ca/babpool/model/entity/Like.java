package ca.babpool.model.entity;

import ca.babpool.model.dto.LikeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Like {
    private Long likesId;
    private String memberId;
    private Long restaurantId;

    public static Like toEntity(LikeDto dto) {
        return Like.builder()
                .likesId(dto.getLikesId())
                .memberId(dto.getMemberId())
                .restaurantId(dto.getRestaurantId())
                .build();
    }
}
