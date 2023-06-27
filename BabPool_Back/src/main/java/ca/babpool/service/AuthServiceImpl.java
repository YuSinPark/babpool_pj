package ca.babpool.service;

import ca.babpool.handler.BusinessExceptionHandler;
import ca.babpool.handler.ErrorCode;
import ca.babpool.mapper.MemberMapper;
import ca.babpool.model.dto.MemberResponseDto;
import ca.babpool.model.dto.OwnerResponseDto;
import ca.babpool.model.entity.Member;
import ca.babpool.model.entity.Role;
import ca.babpool.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public MemberResponseDto findMemberInfoById() {
        Member member = memberMapper.findById(SecurityUtil.getCurrentMemberId());
        Role memberRole = member.getMemberRole();
        if (member == null) {
            throw new UsernameNotFoundException("알수 없는 사용자 입니다.");
        }
        return MemberResponseDto.toDTO(member);
    }

    @Override
    public OwnerResponseDto findOwnerInfoById() {
        Member member = memberMapper.findById(SecurityUtil.getCurrentMemberId());
        Role memberRole = member.getMemberRole();
        if (member == null) {
            throw new UsernameNotFoundException("알수 없는 사용자 입니다.");
        }
        if(memberRole != Role.OWNER) {
            memberMapper.removeRefreshToken(member.getMemberId());
            throw new BusinessExceptionHandler("해당 사용자는 권한이 없습니다",ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
        return OwnerResponseDto.toDTO(member);
    }

    @Override
    public OwnerResponseDto changeOwnerNickname(String memberId,String memberNickname) {
        Member member = memberMapper.findById(memberId);
        if (member == null || memberMapper.NicknameCheck(memberNickname)) {
            throw new BusinessExceptionHandler("중복 체크를 해주셔야 합니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);

        }
        memberMapper.changeMemberNickname(memberId, memberNickname);
        return OwnerResponseDto.toDTO(member);
    }

    @Override
    public MemberResponseDto changeMemberNickname(String memberId,String memberNickname) {
        Member member = memberMapper.findById(memberId);
        if (member == null || memberMapper.NicknameCheck(memberNickname)) {
            throw new BusinessExceptionHandler("중복 체크를 해주셔야 합니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);

        }
        memberMapper.changeMemberNickname(memberId, memberNickname);
        return MemberResponseDto.toDTO(member);
    }

    @Override
    public MemberResponseDto ChangeMemberPhone(String memberId, String memberPhone) {
        Member member = memberMapper.findById(memberId);
        if(member == null) {
            throw new BusinessExceptionHandler("없는 유저입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
        memberMapper.updateMemberPhoneNumber(memberId, memberPhone);
        return MemberResponseDto.toDTO(member);
    }


    @Override
    public int changeMemberPassword(String exPassword, String newPassword) {
        Member member = memberMapper.findById(SecurityUtil.getCurrentMemberId());
        if (member.getMemberId() == null) {
            throw new BusinessExceptionHandler("회원의 정보가 올바르지 않습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
        String exHashedPassword = member.getMemberPassword();
        String newHashedPassword = passwordEncoder.encode(newPassword);
        return memberMapper.changeMemberPassword(exHashedPassword, newHashedPassword);
    }

    @Override
    public int plusMemberInfo(String memberNickname, String memberPhone) {
        Member member = memberMapper.findById(SecurityUtil.getCurrentMemberId());
        Boolean nicknameCheck = memberMapper.NicknameCheck(memberNickname);
        if (member.getMemberId() == null) {
            throw new BusinessExceptionHandler("회원의 정보가 올바르지 않습니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        } else if (memberMapper.NicknameCheck(memberNickname)) {
            throw new BusinessExceptionHandler("중복된 닉네임 입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
        return memberMapper.updateMemberPlusInfo(memberNickname, memberPhone, member.getMemberId());
    }
}
