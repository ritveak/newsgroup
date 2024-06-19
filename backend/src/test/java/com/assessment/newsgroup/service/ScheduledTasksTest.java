package com.assessment.newsgroup.service;

import static org.junit.jupiter.api.Assertions.*;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.NewsApiResponse;
import com.assessment.newsgroup.model.Source;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class ScheduledTasksTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private NewsCache newsCache;

    @InjectMocks
    private ScheduledTasks scheduledTasks;

    @Value("${newsapi.key}")
    private String apiKey = "test-api-key";

    @Value("${newsapi.baseurl}")
    private String baseUrl = "https://newsapi.org/v2";

    @Value("${newsapi.cacheduration}")
    private long cacheDuration = 60000;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        scheduledTasks = new ScheduledTasks(restTemplate, newsCache);
    }

    @Test
    public void testFetchTopHeadlinesSuccess() {
        // Prepare mock response
        NewsApiResponse response = mock(NewsApiResponse.class);
        List<Article> articles = List.of(
                new Article(new Source("id1","Test Title"), "Author","Title","Test Description", "Test URL", "Test URL to Image", "time", "Test Content")
        );
        when(response.articles()).thenReturn(articles);
        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(response);

        // Call the method to be tested
        scheduledTasks.fetchTopHeadlines();

        // Verify interactions and state
        verify(newsCache, times(1)).addToCache(ScheduledTasks.TOP_HEADLINES, articles);
    }

    @Test
    public void testFetchTopHeadlinesFailure() {
        // Prepare mock to throw an exception
        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class)))
                .thenThrow(new RuntimeException("API error"));

        // Call the method to be tested
        scheduledTasks.fetchTopHeadlines();

        // Verify interactions and state
        verify(newsCache, never()).addToCache(anyString(), anyList());
    }

    @Test
    public void testLifecycleMethods() {
        // Verify initial state
        assertFalse(scheduledTasks.isRunning());

        // Start the lifecycle
        scheduledTasks.start();
        assertTrue(scheduledTasks.isRunning());

        // Stop the lifecycle
        scheduledTasks.stop();
        assertFalse(scheduledTasks.isRunning());
    }
}
