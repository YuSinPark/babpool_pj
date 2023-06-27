package ca.babpool.mapper;

import ca.babpool.model.dto.MemberResponseDto;
import ca.babpool.model.entity.Member;
import ca.babpool.model.entity.SocialType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.*;

@Mapper
public interface MemberMapper {

    // 회원가입
    int signup(Member member);

    // id 중복값 찾기
    Boolean idCheck(String memberId);

    // 닉네임 중복값 찾기
    Boolean NicknameCheck(String memberNickname);

    // refreshToken 지우기
    Boolean removeRefreshToken(String memberId);

    // 회원탈퇴
    Boolean Withdrawal(String memberId);

    // 포인트 적립
    int earnPoints(String memberId);

    // 비밀번호 변경
    int resetMemberPw(@Param("memberId") String memberId, @Param("newMemberPassword") String newMemberPassword);

    // 닉네임 변경
    void changeMemberNickname(@Param("memberId") String memberId, @Param("memberNickname") String memberNickname);

    // 패스워드 변경
    int changeMemberPassword(@Param("exPassword") String exPassword, @Param("newPassword") String newPassword);

    // 전화번호, 닉네임 변경
    int updateMemberPlusInfo(@Param("memberNickname") String memberNickname, @Param("memberPhone") String memberPhone, @Param("memberId") String memberId);

    // 전화번호 저장하기
    void updateMemberPhoneNumber(@Param("memberId") String memberId, @Param("memberPhone") String memberPhone);

    // RefreshToken 변경
    void updateRefreshToken(@Param("memberId") String memberId, @Param("memberRefreshToken") String refreshToken);

    // id를 통해 회원 정보 찾기
    Member findById(String memberId);

    // RefreshToken 으로 회원 정보 찾기
    Member findByRefreshToken(String memberRefreshToken);

    // FireBaseToken 추가
    int updateFirebaseToken(@Param("memberId") String memberId, @Param("memberFireBaseToken") String memberFirebaseToken);

    // 아이디 찾기
    List<Member> findMemberId(@Param("memberEmail") String memberEmail, @Param("memberPhone") String memberPhone);

    String selectFirebaseTokenByMemberId(String memberId);

    MemberResponseDto findMemberPhoneByOrdersId(Long ordersId);

    // ordersId 로 memberId 찾기
    MemberResponseDto findMemberIdByOrdersId(Long ordersId);

    // 사용한 포인트 재조정
    void updatePoint(@Param("memberId") String memberId, @Param("memberPoint") Long memberPoint);
}
