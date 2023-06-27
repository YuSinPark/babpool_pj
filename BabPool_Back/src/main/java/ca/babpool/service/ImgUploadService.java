package ca.babpool.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImgUploadService {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private String memberreviewbucket;

    public String uploadBase64ImageToS3(String base64Image) throws IOException {
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);
        String fileName = UUID.randomUUID().toString();
        String bucketName = bucket;
        String folderName = "menuImages/";
        String key = folderName + fileName + ".jpg";

        InputStream inputStream = new ByteArrayInputStream(imageBytes);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(imageBytes.length);
        metadata.setContentType("image/jpeg");

        try {
            PutObjectRequest request = new PutObjectRequest(bucketName, key, inputStream, metadata);
            PutObjectResult result = amazonS3Client.putObject(request);
            return amazonS3Client.getUrl(bucketName, key).toString();
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        } finally {
            inputStream.close();
        }
        return null;
    }
}
