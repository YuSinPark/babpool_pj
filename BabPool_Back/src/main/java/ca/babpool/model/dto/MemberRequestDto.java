package ca.babpool.model.dto;

import ca.babpool.model.entity.Role;
import ca.babpool.model.entity.SocialType;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MemberRequestDto {
    private String memberId;
    private String memberPassword;
    private String memberPhone;
    private String memberEmail;
    private Long memberPoint;
    private Date memberJoinDate;
    private String memberNickname;
    private String memberName;
    private int memberIsWithDraw;
    private Role memberRole;
    private SocialType memberSocialType;
    private String memberRefreshToken;

    public MemberRequestDto toDto(MemberRequestDto requestDto) {
        return MemberRequestDto.builder()
                .memberId(requestDto.getMemberId())
                .memberPassword(requestDto.memberPassword)
                .memberPhone(requestDto.memberPhone)
                .memberEmail(requestDto.memberEmail)
                .memberPoint(0L)
                .memberJoinDate(new Date())
                .memberNickname(requestDto.memberNickname)
                .memberName(requestDto.memberName)
                .memberIsWithDraw(0)
                .memberRole(Role.MEMBER)
                .memberRefreshToken("")
                .memberSocialType(SocialType.HOME)
                .build();
    }
}