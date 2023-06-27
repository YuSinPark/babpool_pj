package ca.babpool.interceptor;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OwnerRestaurantInterceptor implements HandlerInterceptor {

    private final InterceptorUtil util;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        if (memberId.equals("anonymousUser")) {
            response.sendRedirect("/api/error/AuthenticationException");
            return false;
        }

        List<Long> loggedInRestaurantId = util.getLoggedInRestaurantIdList(memberId);
        String requestURI = request.getRequestURI();
        Long requestRestaurantId;

        if (requestURI.matches("^/api/v1/restaurant/\\d+/newOrder$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/restaurant/{restaurantId}/newOrder"));
            return true;
        }

        if (requestURI.matches("^/api/v1/restaurant/\\d+$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/restaurant/{restaurantId}"));
        } else if (requestURI.matches("^/api/v1/restaurant/\\d+/status$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/restaurant/{restaurantId}/status"));
        } else if (requestURI.matches("^/api/v1/restaurant/\\d+/newOrder$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/restaurant/{restaurantId}/newOrder"));
        } else if (requestURI.matches("^/api/v1/restaurant/\\d+/changeStatus$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/restaurant/{restaurantId}/changeStatus"));
        } else if (requestURI.matches("^/api/v1/menu/\\d+$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/menu/{restaurantId}"));
        }else if (requestURI.matches("^/api/v1/restaurant/\\d+/refund$")){
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/restaurant/{restaurantId}/refund"));
        }else if (requestURI.matches("^/api/v1/menu/\\d+/representative$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/menu/{restaurantId}/representative"));
        } else if (requestURI.matches("^/api/v1/menu/\\d+/soldOutHide$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/menu/{restaurantId}/soldOutHide"));
        } else if (requestURI.matches("^/api/v1/menu/\\d+/deleteMenu$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/menu/{restaurantId}/deleteMenu"));
        } else if (requestURI.matches("^/api/v1/menu/\\d+/menuOption")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/menu/{restaurantId}/menuOption"));
        } else if (requestURI.matches("^/api/v1/review/owner/\\d+$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/review/owner/{restaurantId}"));
        } else if (requestURI.matches("^/api/v1/review/owner/\\d+(/\\d+)?$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/review/owner/{restaurantId}/{reviewCommentId}"));
        } else if (requestURI.matches("^/api/v1/review/owner/\\d+/newCoupon")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/review/owner/{restaurantId}/newCoupon"));
        } else if (requestURI.matches("^/api/v1/statistics/\\d+$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/statistics/{restaurantId}"));
        } else if (requestURI.matches("^/api/v1/orderDetails/\\d+$")) {
            requestRestaurantId = Long.parseLong(util.extractPathVariable(requestURI, "/api/v1/orderDetails/{restaurantId}"));
            // requestBody 검사
        } else if (requestURI.matches("^/api/v1/orderDetails$")) {
            requestRestaurantId = util.parseRequestServletBody(request);
        } else {
            response.sendRedirect("/api/error/InvalidApiRequestException");
            return false;
        }

        if (!loggedInRestaurantId.contains(requestRestaurantId)) {
            response.sendRedirect("/api/error/AuthenticationException");
            return false;
        }
        return true;
    }
}
