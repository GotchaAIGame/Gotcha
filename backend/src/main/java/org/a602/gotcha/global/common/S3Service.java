package org.a602.gotcha.global.common;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;
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

    public String uploadImage(String rawbase64EncodedStringImage) {

        if (rawbase64EncodedStringImage == null) {
            return image;
        }
        // data format : data:image/jpeg;base64, 뒤에 base64인코딩 데이터
        String[] splitBase64 = rawbase64EncodedStringImage.split(",");
        String base64EncodedImage = splitBase64[1];
        String imageInfoData = splitBase64[0];
        String[] imageInfoDataSplit = imageInfoData.split("/");
        String imageExtension = imageInfoDataSplit[1].split(";")[0];
        String dataType = imageInfoDataSplit[0].split(":")[1];
        if (!dataType.equals("image")) {
            throw new GlobalBaseException(GlobalErrorCode.INVALID_DATA_TYPE);
        }

        byte[] decode = Base64.getDecoder().decode(base64EncodedImage);
        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(decode)) {
            String s3UploadedImageFileName = UUID.randomUUID() + "." + imageExtension;

            s3Client.putObject(new PutObjectRequest(bucket, s3UploadedImageFileName, inputStream, null));
            return s3Client.getUrl(bucket, s3UploadedImageFileName).toString();
        } catch (IOException e) {
            throw new RuntimeException("이미지 업로드 실패");
        }
    }

    public void deleteImage(String prevImageUrl) {
        s3Client.deleteObject(bucket, prevImageUrl);
    }
}
