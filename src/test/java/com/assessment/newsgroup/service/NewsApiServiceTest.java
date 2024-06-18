package com.assessment.newsgroup.service;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.CustomChronoUnit;
import com.assessment.newsgroup.model.NewsApiResponse;
import com.assessment.newsgroup.model.Source;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NewsApiServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private NewsCache newsCache;

    @InjectMocks
    private NewsApiService newsApiService;

    @BeforeEach
    public void setUp() {
        ReflectionTestUtils.setField(newsApiService, "apiKey", "testApiKey");
        ReflectionTestUtils.setField(newsApiService, "baseUrl", "http://testurl.com");
        ReflectionTestUtils.setField(newsApiService, "cacheDuration", 3600L);
    }

    @Test
    public void testSearchNews_WithValidResponse() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        var publishedAt = ZonedDateTime.now().truncatedTo(ChronoUnit.HOURS).minusHours(21);
        Article article = new Article(new Source("id1","Test Title"), "Author","Title","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        NewsApiResponse response = new NewsApiResponse("ok", 1, List.of(article));

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(response);

        Map<String, List<Article>> result = newsApiService.searchNews(keyword, interval, unit);

        assertEquals(1, result.size());
        var expectedKey = publishedAt.plusHours(9).truncatedTo(ChronoUnit.HOURS).toString();
        assertTrue(result.containsKey(expectedKey));
        assertEquals(1, result.get(expectedKey).size());

        verify(newsCache, times(1)).addToCache(eq(keyword), eq(List.of(article)));
    }

    @Test
    public void testSearchNews_WithCacheFallback() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        var publishedAt = ZonedDateTime.now().truncatedTo(ChronoUnit.HOURS).minusHours(21);
        Article article = new Article(new Source("id1","Test Title"), "Author","Title","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR));
        when(newsCache.isCacheValid(eq(keyword), anyLong())).thenReturn(true);
        when(newsCache.getFromCache(eq(keyword))).thenReturn(List.of(article));

        Map<String, List<Article>> result = newsApiService.searchNews(keyword, interval, unit);

        assertEquals(1, result.size());
        var expectedKey = publishedAt.plusHours(9).truncatedTo(ChronoUnit.HOURS).toString();
        assertTrue(result.containsKey(expectedKey));
        assertEquals(1, result.get(expectedKey).size());

        verify(newsCache, times(1)).isCacheValid(eq(keyword), anyLong());
        verify(newsCache, times(1)).getFromCache(eq(keyword));
    }

    @Test
    public void testSearchNews_NoCacheAndApiFailure() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenThrow(new ResourceAccessException("API unavailable"));
        when(newsCache.isCacheValid(eq(keyword), anyLong())).thenReturn(false);

        Map<String, List<Article>> result = newsApiService.searchNews(keyword, interval, unit);

        assertTrue(result.isEmpty());

        verify(newsCache, times(1)).isCacheValid(eq(keyword), anyLong());
        verify(newsCache, times(0)).getFromCache(eq(keyword));
    }
}
