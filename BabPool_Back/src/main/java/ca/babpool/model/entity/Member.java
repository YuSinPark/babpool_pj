package ca.babpool.model.entity;

import ca.babpool.model.dto.MemberRequestDto;
import ca.babpool.model.dto.OwnerRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Getter
@AllArgsConstructor
@Builder
@ToString
public class Member {
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
    private String memberFireBaseToken;

    public static Member toOwnerEntity(OwnerRequestDto requestDto) {
        return Member.builder()
                .memberId(requestDto.getMemberId())
                .memberPassword(requestDto.getMemberPassword())
                .memberPhone(requestDto.getMemberPhone())
                .memberEmail(requestDto.getMemberEmail())
                .memberPoint(0L)
                .memberJoinDate(new Date())
                .memberNickname(requestDto.getMemberNickname())
                .memberName(requestDto.getMemberName())
                .memberIsWithDraw(0)
                .memberRole(Role.OWNER)
                .memberRefreshToken("")
                .memberSocialType(SocialType.HOME)
                .memberFireBaseToken("")
                .build();
    }

    public static Member toMemberEntity(MemberRequestDto requestDto) {
        return Member.builder()
                .memberId(requestDto.getMemberId())
                .memberPassword(requestDto.getMemberPassword())
                .memberPhone(requestDto.getMemberPhone())
                .memberEmail(requestDto.getMemberEmail())
                .memberPoint(0L)
                .memberJoinDate(new Date())
                .memberNickname(requestDto.getMemberNickname())
                .memberName(requestDto.getMemberName())
                .memberIsWithDraw(0)
                .memberRole(Role.MEMBER)
                .memberRefreshToken("")
                .memberSocialType(SocialType.HOME)
                .memberFireBaseToken("")
                .build();
    }


}