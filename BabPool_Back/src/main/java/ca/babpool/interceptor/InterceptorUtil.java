package ca.babpool.interceptor;

import ca.babpool.mapper.RestaurantMapper;
import ca.babpool.model.dto.restaurant.RestaurantDto;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class InterceptorUtil {

    private final RestaurantMapper mapper;

    public List<Long> getLoggedInRestaurantIdList(String memberId) {
        List<RestaurantDto> restaurantDtoList = mapper.getAllRestaurant(memberId);

        return restaurantDtoList.stream()
                .map(RestaurantDto::getRestaurantId)
                .collect(Collectors.toList());
    }

    public String extractPathVariable(String url, String path) {
        AntPathMatcher pathMatcher = new AntPathMatcher();
        return pathMatcher.extractUriTemplateVariables(path, url).get("restaurantId");
    }

    public Long parseRequestServletBody(HttpServletRequest request) throws IOException {
        String reqBody = (String) request.getAttribute("requestBody");
        Gson gson = new Gson();
        JsonElement jsonElement = gson.fromJson(reqBody, JsonElement.class);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        Long restaurantId = jsonObject.get("restaurantId").getAsLong();
        return restaurantId;
    }
}
