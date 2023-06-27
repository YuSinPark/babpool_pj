package ca.babpool.service;

import ca.babpool.model.dto.MemberRequestDto;
import ca.babpool.model.dto.OwnerRequestDto;

import java.util.*;

public interface MemberService {
    int MemberSignup(MemberRequestDto requestDto);
    int OwnerSignup(OwnerRequestDto requestDto);
    int updateFirebaseToken(Map<String, String> FBToken);
    List<String> findMemberId(String memberEmail, String memberPhone);
    int resetPassword(String memberId, String memberEmail) throws Exception;

}
