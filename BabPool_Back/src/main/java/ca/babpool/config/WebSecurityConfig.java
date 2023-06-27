package ca.babpool.config;


import ca.babpool.filter.CustomUsernamePasswordAuthenticationFilter;
import ca.babpool.handler.LoginFailureHandler;
import ca.babpool.handler.LoginSuccessHandler;
import ca.babpool.filter.JwtAuthenticationFilter;
import ca.babpool.mapper.MemberMapper;
import ca.babpool.service.CustomUserDetailsService;
import ca.babpool.service.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtService jwtService;
    private final MemberMapper memberMapper;
    private final ObjectMapper objectMapper;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .formLogin().disable()
                .httpBasic().disable()
                .cors()

                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeHttpRequests()
                .anyRequest().permitAll();

        http.addFilterAfter(customAuthenticationFilter(), LogoutFilter.class);
        http.addFilterBefore(jwtAuthenticationFilter(), CustomUsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(customUserDetailsService);
        return new ProviderManager(provider);
    }

    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService, memberMapper);
    }

    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }

    @Bean
    public CustomUsernamePasswordAuthenticationFilter customAuthenticationFilter() {
        CustomUsernamePasswordAuthenticationFilter customUsernamePasswordLoginFilter = new CustomUsernamePasswordAuthenticationFilter(objectMapper);
        customUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
        customUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
        customUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
        return customUsernamePasswordLoginFilter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtService, memberMapper);
        return jwtAuthenticationFilter;
    }
}
