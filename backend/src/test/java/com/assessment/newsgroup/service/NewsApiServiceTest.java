package com.assessment.newsgroup.service;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

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
    }

    @Test
    public void testSearchNews_WithValidResponse() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        var publishedAt = ZonedDateTime.now().truncatedTo(ChronoUnit.HOURS).minusHours(21);
        Article article = new Article(new Source("id1","Test Title"), "Author","Title","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        Article removedArticle = new Article(new Source("id1","Test Title"), "Author","[Removed]","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        var listOfArticles = new ArrayList<Article>();
        listOfArticles.add(article);
        listOfArticles.add(removedArticle);
        NewsApiResponse response = new NewsApiResponse("ok", 1,listOfArticles);

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(response);

        var result = newsApiService.searchNews(keyword, interval, unit,false);

        assertEquals(1, result.result().size());
        var expectedKey = publishedAt.plusHours(9).truncatedTo(ChronoUnit.HOURS).toString();
        assertTrue(result.result().containsKey(expectedKey));
        assertEquals(1, result.result().get(expectedKey).size());

        verify(newsCache, times(1)).addToCache(eq(keyword), eq(List.of(article)));
    }
    @Test
    public void testSearchNews_WithCacheFallback_WhenAPIReturnsNull() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        var publishedAt = ZonedDateTime.now().truncatedTo(ChronoUnit.HOURS).minusHours(21);
        Article article = new Article(new Source("id1","Test Title"), "Author","Title","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(null);

        when(newsCache.getFromCache(eq(keyword))).thenReturn(new FetchedArticleResponse(List.of(article),"headerMessage"));


        var result = newsApiService.searchNews(keyword, interval, unit,false);

        assertEquals(1, result.result().size());
        var expectedKey = publishedAt.plusHours(9).truncatedTo(ChronoUnit.HOURS).toString();
        assertTrue(result.result().containsKey(expectedKey));
        assertEquals(1, result.result().get(expectedKey).size());

        verify(newsCache, times(0)).addToCache(eq(keyword), eq(List.of(article)));
        verify(newsCache, times(1)).getFromCache(eq(keyword));

    }
    @Test
    public void testSearchNews_WithCacheFallback_WhenAPIReturnsEmptyList() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        var publishedAt = ZonedDateTime.now().truncatedTo(ChronoUnit.HOURS).minusHours(21);
        Article article = new Article(new Source("id1","Test Title"), "Author","Title","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(new NewsApiResponse("status",0,new ArrayList<>()));

        when(newsCache.getFromCache(eq(keyword))).thenReturn(new FetchedArticleResponse(List.of(article),"message"));


        var result = newsApiService.searchNews(keyword, interval, unit,false);

        assertEquals(1, result.result().size());
        var expectedKey = publishedAt.plusHours(9).truncatedTo(ChronoUnit.HOURS).toString();
        assertTrue(result.result().containsKey(expectedKey));
        assertEquals(1, result.result().get(expectedKey).size());

        verify(newsCache, times(0)).addToCache(eq(keyword), eq(List.of(article)));
        verify(newsCache, times(1)).getFromCache(eq(keyword));

    }
    @Test
    public void testSearchNews_WithCacheFallback_WhenAPIReturnsRemovedArticles() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        var publishedAt = ZonedDateTime.now().truncatedTo(ChronoUnit.HOURS).minusHours(21);
        Article removedArticle = new Article(new Source("id1","Test Title"), "Author","[Removed]","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        Article article = new Article(new Source("id1","Test Title"), "Author","Test Title","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        var list = new ArrayList<Article>();
        list.add(removedArticle);
        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenReturn(new NewsApiResponse("status",0,list));

        when(newsCache.getFromCache(eq(ScheduledTasks.TOP_HEADLINES))).thenReturn(new FetchedArticleResponse(List.of(article),"message"));


        var result = newsApiService.searchNews(keyword, interval, unit,false);

        assertEquals(1, result.result().size());
        var expectedKey = publishedAt.plusHours(9).truncatedTo(ChronoUnit.HOURS).toString();
        assertTrue(result.result().containsKey(expectedKey));
        assertEquals(1, result.result().get(expectedKey).size());

        verify(restTemplate, times(1)).getForObject(anyString(), eq(NewsApiResponse.class));
        verify(newsCache, times(1)).addToCache(eq(keyword), any());
        verify(newsCache, times(1)).getFromCache(eq(ScheduledTasks.TOP_HEADLINES));

    }
    @Test
    public void testSearchNews_WithCacheFallback_WhenOfflineMode() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        var publishedAt = ZonedDateTime.now().truncatedTo(ChronoUnit.HOURS).minusHours(21);
        Article article = new Article(new Source("id1","Test Title"), "Author","Title","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");
        when(newsCache.getFromCache(eq(keyword))).thenReturn(new FetchedArticleResponse(List.of(article),"message"));


        var result = newsApiService.searchNews(keyword, interval, unit,true);

        assertEquals(1, result.result().size());
        var expectedKey = publishedAt.plusHours(9).truncatedTo(ChronoUnit.HOURS).toString();
        assertTrue(result.result().containsKey(expectedKey));
        assertEquals(1, result.result().get(expectedKey).size());

        verify(newsCache, times(0)).addToCache(eq(keyword), eq(List.of(article)));
        verify(newsCache, times(1)).getFromCache(eq(keyword));

    }
    @Test
    public void testSearchNews_WithCacheFallback_WhenExceptionFromAPI() {
        String keyword = "test";
        CustomChronoUnit unit = CustomChronoUnit.HOURS;
        long interval = 12L;

        var publishedAt = ZonedDateTime.now().truncatedTo(ChronoUnit.HOURS).minusHours(21);
        Article article = new Article(new Source("id1","Test Title"), "Author","Title","Test Description", "Test URL", "Test URL to Image", publishedAt.toString(), "Test Content");

        when(restTemplate.getForObject(anyString(), eq(NewsApiResponse.class))).thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR));
        when(newsCache.getFromCache(eq(keyword))).thenReturn(new FetchedArticleResponse( List.of(article),"message"));

        var result = newsApiService.searchNews(keyword, interval, unit,false);

        assertEquals(1, result.result().size());
        var expectedKey = publishedAt.plusHours(9).truncatedTo(ChronoUnit.HOURS).toString();
        assertTrue(result.result().containsKey(expectedKey));
        assertEquals(1, result.result().get(expectedKey).size());

        verify(newsCache, times(1)).getFromCache(eq(keyword));
    }
}
