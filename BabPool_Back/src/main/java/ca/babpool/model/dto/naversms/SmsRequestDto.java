package ca.babpool.model.dto.naversms;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SmsRequestDto {

    private String type;
    private String contentType;
    private String countryCode;
    private String from;
    private String content;
    private List<MessageDto> messages;

}
