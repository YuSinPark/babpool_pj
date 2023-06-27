package ca.babpool.service;

import ca.babpool.model.dto.MemberResponseDto;
import ca.babpool.model.dto.OwnerResponseDto;

public interface AuthService {
    OwnerResponseDto findOwnerInfoById();
    MemberResponseDto findMemberInfoById();
    OwnerResponseDto changeOwnerNickname(String memberId,String memberNickname);
    MemberResponseDto changeMemberNickname(String memberId,String memberNickname);
    MemberResponseDto ChangeMemberPhone(String memberId, String memberPhone);
    int changeMemberPassword(String exPassword, String newPassword);
    int plusMemberInfo(String memberNickname, String memberPhone);

}
