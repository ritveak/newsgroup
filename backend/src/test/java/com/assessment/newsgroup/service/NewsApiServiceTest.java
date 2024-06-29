package com.assessment.newsgroup.service;
import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.controller.NewsNotFoundException;
import com.assessment.newsgroup.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class NewsApiServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private NewsCache newsCache;

    @InjectMocks
    private NewsApiService newsApiService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        newsApiService = new NewsApiService(restTemplate, newsCache);
    }

    @Test
    public void testSearchNews_WithValidAPIResponse() throws NewsNotFoundException {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;
        ZonedDateTime publishedAt = ZonedDateTime.now().minusHours(1);
        Article article = new Article(new Source("id1", "Test Title"), "Author", "Title", "Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        NewsApiResponse response = new NewsApiResponse("ok", 1, List.of(article));

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(response);

        ResponsePayload result = newsApiService.searchNews(keyword, interval, unit, false);

        assertNotNull(result);
        assertEquals(1, result.result().size());
        verify(newsCache, times(1)).addToCache(eq(keyword), anyList());
    }

    @Test
    public void testSearchNews_WithCacheFallback_WhenAPIReturnsEmptyList() throws NewsNotFoundException {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;
        ZonedDateTime publishedAt = ZonedDateTime.now().minusHours(21);
        Article article = new Article(new Source("id1", "Test Title"), "Author", "Title", "Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(new NewsApiResponse("status", 0, new ArrayList<>()));
        when(newsCache.getFromCache(anyString())).thenReturn(new FetchedArticleResponse(List.of(article), "message"));
        when(newsCache.isCacheValid(anyString())).thenReturn(false);

        ResponsePayload result = newsApiService.searchNews(keyword, interval, unit, false);

        assertEquals(1, result.result().size());
        verify(newsCache, times(0)).addToCache(eq(keyword), anyList());
        verify(newsCache, times(1)).getFromCache(eq("test"));
    }

    @Test
    public void testSearchNews_WithInvalidData_FromAPI() throws NewsNotFoundException {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(null);
        when(newsCache.getFromCache(anyString())).thenReturn(new FetchedArticleResponse(new ArrayList<>(), "message"));
        when(newsCache.isCacheValid(anyString())).thenReturn(false);

        ResponsePayload result = newsApiService.searchNews(keyword, interval, unit, false);

        assertNotNull(result);
        assertTrue(result.result().isEmpty());
        verify(newsCache, times(0)).addToCache(eq(keyword), anyList());
        verify(newsCache, times(1)).getFromCache(eq("test"));
    }

    @Test
    public void testSearchNews_WithOfflineMode() throws NewsNotFoundException {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;
        ZonedDateTime publishedAt = ZonedDateTime.now().minusHours(1);
        Article article = new Article(new Source("id1", "Test Title"), "Author", "Title", "Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");

        when(newsCache.getFromCache(anyString())).thenReturn(new FetchedArticleResponse(List.of(article), "message"));
        when(newsCache.isCacheValid(anyString())).thenReturn(true);

        ResponsePayload result = newsApiService.searchNews(keyword, interval, unit, true);

        assertNotNull(result);
        assertEquals(1, result.result().size());
        verify(newsCache, times(0)).addToCache(eq(keyword), anyList());
        verify(restTemplate, times(0)).getForObject(anyString(), eq(NewsApiResponse.class));
    }

    @Test
    public void testFetchArticleResponseFromAPIOrCache_WithServerError() throws NewsNotFoundException {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;
        ZonedDateTime publishedAt = ZonedDateTime.now().minusHours(1);
        Article article = new Article(new Source("id1", "Test Title"), "Author", "Title", "Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenThrow(HttpServerErrorException.class);
        when(newsCache.getFromCache(anyString())).thenReturn(new FetchedArticleResponse(List.of(article), "message"));

        ResponsePayload result = newsApiService.searchNews(keyword, interval, unit, false);

        assertNotNull(result);
        assertEquals(1, result.result().size());
        verify(newsCache, times(1)).getFromCache(eq("test"));
    }
    @Test
    public void testFetchArticlesFromAPI_WithRemovedAndNullTitles() throws NewsNotFoundException {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;
        ZonedDateTime publishedAt = ZonedDateTime.now().minusHours(1);

        // Mock articles with null and "[Removed]" titles
        Article removedArticle = new Article(new Source("id1", "Test Source"), "Author", "[Removed]", "Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        Article nullTitleArticle = new Article(new Source("id2", "Test Source"), "Author", null, "Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        var list = new ArrayList<Article>();
        list.add(removedArticle);
        list.add(nullTitleArticle);
        NewsApiResponse response = new NewsApiResponse("ok", 2, list);

        // Mocking the RestTemplate to return the above response
        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(response);

        // Mocking the fallback to cache
        when(newsCache.getFromCache(anyString())).thenReturn(new FetchedArticleResponse(new ArrayList<>(), "message"));

        ResponsePayload result = newsApiService.searchNews(keyword, interval, unit, false);

        assertNotNull(result);
        verify(newsCache, times(1)).getFromCache(eq("test"));
    }

}
