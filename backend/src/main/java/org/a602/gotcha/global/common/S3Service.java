package org.a602.gotcha.global.common;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.UUID;

@Service
public class S3Service {
    private final AmazonS3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${default-image}")
    private String image;

    public S3Service(AmazonS3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadImage(String base64EncodedStringImage) {

        if (base64EncodedStringImage == null) {
            return image;
        }
        byte[] decode = Base64.getDecoder().decode(base64EncodedStringImage);
        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(decode)) {
            String key = UUID.randomUUID().toString();
            s3Client.putObject(new PutObjectRequest(bucket, key, inputStream, null));
            return s3Client.getUrl(bucket, key).toString();
        } catch (IOException e) {
            throw new RuntimeException("이미지 업로드 실패");
        }
    }

    public void deleteImage(String prevImageUrl) {
        s3Client.deleteObject(bucket, prevImageUrl);
    }
}
