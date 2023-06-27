package ca.babpool.utils;

import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.*;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Component;

@Component
public class GeocodeUtil {
    @Value("${kakao.secret.key}")
    private String KAKAO_KEY;
    private String API_URL = "https://dapi.kakao.com/v2/local/search/address.json?query=";
    String jsonString = null;

    Map<String, Double> result = new HashMap<>();

    public Map<String, Double> getCoordinate(String address) throws UnsupportedEncodingException, MalformedURLException, IOException {
        try {
            String roadAddress = URLEncoder.encode(address, "UTF-8");
            String reqAdd = API_URL + roadAddress;
            URL url = new URL(reqAdd);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "KakaoAK " + KAKAO_KEY);

            BufferedReader rd = null;
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuffer docJson = new StringBuffer();

            String line;

            while ((line = rd.readLine()) != null) {
                docJson.append(line);
            }

            jsonString = docJson.toString();
            rd.close();

            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(jsonString, JsonObject.class);
            JsonObject jsonAddress = jsonObject.getAsJsonArray("documents")
                    .get(0)
                    .getAsJsonObject()
                    .get("address")
                    .getAsJsonObject();
            Double longitude = jsonAddress.get("x").getAsDouble();
            Double latitude = jsonAddress.get("y").getAsDouble();

            result.put("longitude", longitude);
            result.put("latitude", latitude);

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }

        return result;
    }
}
