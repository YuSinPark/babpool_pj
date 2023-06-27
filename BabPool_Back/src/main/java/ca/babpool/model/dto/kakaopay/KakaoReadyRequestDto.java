package ca.babpool.model.dto.kakaopay;

import lombok.*;

@Getter
@Setter
@ToString
public class KakaoReadyRequestDto {
    private String partner_order_id;
    private String partner_user_id;
    private Integer total_amount;
    private String item_name;
    private Integer quantity;
}
