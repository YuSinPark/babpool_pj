package ca.babpool.model.dto.kakaopay;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoApproveRequestDto {
    private String pg_token;
    private String cid;
    private String tid;
    private String partner_order_id;
    private String partner_user_id;
    private Integer total_amount;
}
