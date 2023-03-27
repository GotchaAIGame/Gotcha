package org.a602.gotcha.global;


import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSConfig {


    @Bean
    public AmazonS3Client s3Client(@Value("${cloud.aws.credentials.access-key}") final String accessKey,
                                   @Value("${cloud.aws.credentials.secret-key}") final String secretKey,
                                   @Value("${cloud.aws.region.static}") final String region) {

        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .withRegion(region)
                .build();
    }
}
