//package ca.babpool.interceptor;
//
//import ca.babpool.mapper.RestaurantMapper;
//import ca.babpool.model.dto.restaurant.RestaurantDto;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//
//import java.util.Collections;
//import java.util.List;
//
//import static org.mockito.Mockito.*;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//class OwnerRestaurantInterceptorTest {
//    private OwnerRestaurantInterceptor interceptor;
//
//    @Mock
//    private InterceptorUtil interceptorUtil;
//
//    @Mock
//    private RestaurantMapper mapper;
//
//    @Mock
//    private HttpServletRequest request;
//
//    @Mock
//    private HttpServletResponse response;
//
//    @Mock
//    private Object handler;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//        interceptor = new OwnerRestaurantInterceptor(interceptorUtil);
//    }
//    @Test
//    void 로그인유저_요청유저_비교() throws Exception {
//        //given
//        String memberId = "user1";
//        Long restaurantId = 1L;
//        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(memberId, null));
//        when(request.getRequestURI()).thenReturn("/api/v1/restaurant" + restaurantId);
//        RestaurantDto dto = new RestaurantDto();
//        dto.setRestaurantId(restaurantId);
//        dto.setMemberId(memberId);
//        when(mapper.getAllRestaurant(memberId)).thenReturn(Collections.singletonList(dto));
//        List<Long> loggedInRestaurantIds = Collections.singletonList(1L);
//
//        //when
//        boolean result = interceptor.preHandle(request, response, handler);
//
//        //then
//        assertTrue(loggedInRestaurantIds.contains(restaurantId));
//        verify(request, times(1)).getRequestURI();
//        verify(mapper, times(1)).getAllRestaurant(memberId);
//    }
//
//}