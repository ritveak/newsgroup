package com.assessment.newsgroup.configuration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;

import org.springframework.web.client.RestTemplate;

import com.assessment.newsgroup.cache.NewsCache;

import io.swagger.v3.oas.models.OpenAPI;
import org.springdoc.core.models.GroupedOpenApi;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class AppConfigTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    public void testRestTemplateBean() {
        RestTemplate restTemplate = applicationContext.getBean(RestTemplate.class);
        assertNotNull(restTemplate, "RestTemplate bean should not be null");
    }

    @Test
    public void testNewsCacheBean() {
        NewsCache newsCache = applicationContext.getBean(NewsCache.class);
        assertNotNull(newsCache, "NewsCache bean should not be null");
    }

    @Test
    public void testOpenAPIBean() {
        OpenAPI openAPI = applicationContext.getBean(OpenAPI.class);
        assertNotNull(openAPI, "OpenAPI bean should not be null");
        assertEquals("News Search API", openAPI.getInfo().getTitle(), "OpenAPI title should match");
        assertEquals("1.0", openAPI.getInfo().getVersion(), "OpenAPI version should match");
        assertEquals("API for searching news articles", openAPI.getInfo().getDescription(), "OpenAPI description should match");
    }

    @Test
    public void testGroupedOpenApiBean() {
        GroupedOpenApi groupedOpenApi = applicationContext.getBean(GroupedOpenApi.class);
        assertNotNull(groupedOpenApi, "GroupedOpenApi bean should not be null");
        assertEquals("public", groupedOpenApi.getGroup(), "GroupedOpenApi group name should match");
    }
}
