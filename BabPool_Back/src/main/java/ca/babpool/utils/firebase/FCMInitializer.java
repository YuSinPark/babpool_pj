package ca.babpool.utils.firebase;

import ca.babpool.handler.ErrorCode;
import com.google.api.gax.rpc.ApiException;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Configuration
@Slf4j
public class FCMInitializer {

    @Value("${fcm.certification}")
    private String credential;

    @Bean
    FirebaseMessaging firebaseMessaging() throws IOException {
        ClassPathResource resource = new ClassPathResource(credential + ".json");

        InputStream stream = resource.getInputStream();

        FirebaseApp firebaseApp = null;
        List<FirebaseApp> firebaseAppList = FirebaseApp.getApps();

        if (firebaseAppList != null && !firebaseAppList.isEmpty()) {
            for (FirebaseApp app : firebaseAppList) {
                if (app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)) {
                    firebaseApp = app;
                }
            }
        } else {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(stream))
                    .build();

            firebaseApp = FirebaseApp.initializeApp(options);
            log.info("FCM setting completed");
        }

        return FirebaseMessaging.getInstance(firebaseApp);
    }
}
