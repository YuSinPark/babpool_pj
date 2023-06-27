package ca.babpool.service;

import ca.babpool.handler.BusinessExceptionHandler;
import ca.babpool.handler.ErrorCode;
import ca.babpool.mapper.MemberMapper;
import ca.babpool.model.dto.MemberRequestDto;
import ca.babpool.model.dto.OwnerRequestDto;
import ca.babpool.model.entity.Member;
import ca.babpool.utils.MailUtil;
import ca.babpool.utils.PasswordUtil;
import ca.babpool.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public int MemberSignup(MemberRequestDto requestDto) {
        String hashedPassword = passwordEncoder.encode(requestDto.getMemberPassword());
        requestDto.setMemberPassword(hashedPassword);
        if (memberMapper.findById(requestDto.getMemberId()) != null || memberMapper.NicknameCheck(requestDto.getMemberNickname())) {
            throw new BusinessExceptionHandler("중복검사를 해주세요", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
        return memberMapper.signup(Member.toMemberEntity(requestDto));
    }

    @Override
    public int OwnerSignup(OwnerRequestDto requestDto) {
        String hashedPassword = passwordEncoder.encode(requestDto.getMemberPassword());
        requestDto.setMemberPassword(hashedPassword);
        if (memberMapper.findById(requestDto.getMemberId()) != null || memberMapper.NicknameCheck(requestDto.getMemberNickname())) {
            throw new BusinessExceptionHandler("중복검사를 해주세요", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
        return memberMapper.signup(Member.toOwnerEntity(requestDto));
    }

    @Override
    public int updateFirebaseToken(Map<String, String> FBToken) {
        String firebaseToken = FBToken.get("FBToken");
        String memberId = SecurityUtil.getCurrentMemberId();
        return memberMapper.updateFirebaseToken(memberId, firebaseToken);
    }

    @Override
    public List<String> findMemberId(String memberEmail, String memberPhone) {
        List<Member> members = memberMapper.findMemberId(memberEmail, memberPhone);

        List<String> memberIds = new ArrayList<>();
        if (members == null || members.isEmpty()) {
            throw new BusinessExceptionHandler("아이디가 없습니다", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        } else {
            for (Member member : members) {
                memberIds.add(member.getMemberId());
            }
        }
        return memberIds;
    }

    @Override
    public int resetPassword(String memberId, String memberEmail) throws Exception {
        Member member = memberMapper.findById(memberId);
        if (member == null) {
            throw new BusinessExceptionHandler("회원님을 찾을수 없습니다", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
        if (member.getMemberId().equals(memberId) && member.getMemberEmail().equals(memberEmail)) {
            String secretPw = PasswordUtil.generateRandomPassword();
            MailUtil mailUtil = new MailUtil();
            mailUtil.sendEmail(memberId, memberEmail, secretPw);

            memberMapper.resetMemberPw(memberId, passwordEncoder.encode(secretPw));
        } else {
            throw new BusinessExceptionHandler("아이디 혹은 이메일이 존재하지 않습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
        return 0;
    }
}
