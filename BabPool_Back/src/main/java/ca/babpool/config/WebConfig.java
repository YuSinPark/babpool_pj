package ca.babpool.config;

import ca.babpool.filter.CopyBodyFilter;
import ca.babpool.interceptor.OwnerRestaurantInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final OwnerRestaurantInterceptor ownerRestaurantInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","http://localhost:3001","http://172.30.1.50:3000",
                        "http://babpoolme.s3-website.ap-northeast-2.amazonaws.com",
                        "http://babpool-owner.s3-website.ap-northeast-2.amazonaws.com",
                        "https://babpoolapp.shop", "https://babpoolowner.store", "https://www.babpoolme.store"
                        )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*", "Content-Type", "Authorization")
                .allowCredentials(true)
                .maxAge(3000);
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(ownerRestaurantInterceptor)
                .addPathPatterns("/api/v1/restaurant/{restaurantId:\\d+}/**",
                        "/api/v1/menu/{restaurantId:\\d+}/**",
                        "/api/v1/review/owner/{restaurantId:\\d+}/**",
                        "/api/v1/review/owner/{restaurantId:\\d+}/{reviewCommentId:\\d+}/**",
                        "/api/v1/statistics/{restaurantId:\\d+}/**",
                        "/api/v1/orderDetails",
                        "/api/v1/orderDetails/{restaurantId:\\d+}/**");

    }
    @Bean
    public FilterRegistrationBean<CopyBodyFilter> copyBodyFilter() {
        FilterRegistrationBean<CopyBodyFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CopyBodyFilter());
        registrationBean.addUrlPatterns("/api/v1/orderDetails");
        return registrationBean;
    }

}
