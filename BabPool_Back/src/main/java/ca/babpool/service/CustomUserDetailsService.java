package ca.babpool.service;

import ca.babpool.mapper.MemberMapper;
import ca.babpool.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member memberId = mapper.findById(username);
        if (memberId == null) {
            throw new UsernameNotFoundException(username + " 을 찾을수 없습니다");
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(memberId.getMemberId())
                .password(memberId.getMemberPassword())
                .roles(memberId.getMemberRole().name())
                .build();
    }
}
