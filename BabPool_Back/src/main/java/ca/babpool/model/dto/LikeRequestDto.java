package ca.babpool.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class LikeRequestDto {
    private String memberId;
    private Long restaurantId;
}
