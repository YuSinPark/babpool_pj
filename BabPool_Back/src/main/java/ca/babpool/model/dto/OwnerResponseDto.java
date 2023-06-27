package ca.babpool.model.dto;

import ca.babpool.model.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OwnerResponseDto {
    private String memberId;
    private String memberPhone;
    private String memberEmail;
    private Date memberJoinDate;
    private String memberNickname;
    private String memberName;

    public static OwnerResponseDto toDTO(Member member) {
        return OwnerResponseDto.builder()
                .memberId(member.getMemberId())
                .memberPhone(member.getMemberPhone())
                .memberEmail(member.getMemberEmail())
                .memberJoinDate(member.getMemberJoinDate())
                .memberNickname(member.getMemberNickname())
                .memberName(member.getMemberName())
                .build();
    }
}
