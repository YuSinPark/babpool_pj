package ca.babpool.model.dto;

import ca.babpool.model.entity.Member;
import ca.babpool.model.entity.Role;
import ca.babpool.model.entity.SocialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String memberId;
    private String memberPhone;
    private String memberEmail;
    private Long memberPoint;
    private Date memberJoinDate;
    private String memberNickname;
    private String memberName;
    private Role memberRole;
    private SocialType memberSocialType;

    public static MemberResponseDto toDTO(Member member) {
        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .memberPhone(member.getMemberPhone())
                .memberEmail(member.getMemberEmail())
                .memberPoint(member.getMemberPoint())
                .memberJoinDate(member.getMemberJoinDate())
                .memberNickname(member.getMemberNickname())
                .memberName(member.getMemberName())
                .memberRole(member.getMemberRole())
                .memberSocialType(member.getMemberSocialType())
                .build();
    }

}
