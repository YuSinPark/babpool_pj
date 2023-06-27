package ca.babpool.model.dto.naversms;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private String to;
    private String content;
}
