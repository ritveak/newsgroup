package com.assessment.newsgroup.cache;
import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.FetchedArticleResponse;
import com.assessment.newsgroup.model.Source;
import com.assessment.newsgroup.service.ScheduledTasks;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class NewsCacheTest {

    private NewsCache newsCache;

    @BeforeEach
    public void setUp() throws Exception {
        newsCache = new NewsCache();
        setPrivateField(newsCache, "cacheDuration", 1000L);
    }

    private void setPrivateField(Object target, String fieldName, Object value) throws Exception {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    }

    @Test
    public void testAddToCacheAndGetFromCache() {
        String keyword = "test";
        Article article = new Article(new Source("id1", "Test Source"), "Author", "Title", "Description", "URL", "URL to Image", "2024-06-18T12:00:00Z", "Content");

        newsCache.addToCache(keyword, List.of(article));

        FetchedArticleResponse response = newsCache.getFromCache(keyword);

        assertNotNull(response);
        assertEquals(1, response.articles().size());
        assertEquals(article, response.articles().get(0));
        assertTrue(response.headerMessage().contains("Fetched results for test from cache."));
    }

    @Test
    public void testCacheExpiry() throws InterruptedException {
        String keyword = "test";
        Article article = new Article(new Source("id1", "Test Source"), "Author", "Title", "Description", "URL", "URL to Image", "2024-06-18T12:00:00Z", "Content");

        newsCache.addToCache(keyword, List.of(article));

        // Wait for cache to expire
        Thread.sleep(1500);

        FetchedArticleResponse response = newsCache.getFromCache(keyword);

        assertNotNull(response);
        assertTrue(response.articles().isEmpty());
        assertTrue(response.headerMessage().contains("Could not find results for test"));
    }

    @Test
    public void testFallbackToTopHeadlines() {
        String keyword = "test";
        Article article = new Article(new Source("id1", "Top Source"), "Author", "Title", "Description", "URL", "URL to Image", "2024-06-18T12:00:00Z", "Content");

        newsCache.addToCache(ScheduledTasks.TOP_HEADLINES, List.of(article));

        FetchedArticleResponse response = newsCache.getFromCache(keyword);

        assertNotNull(response);
        assertEquals(1, response.articles().size());
        assertEquals(article, response.articles().get(0));
        assertTrue(response.headerMessage().contains("Could not find results for test. Enjoy the headlines for now."));
    }

    @Test
    public void testCleanupCacheWithoutHeadlines() {
        String keyword1 = "test1";
        String keyword2 = "test2";
        Article article = new Article(new Source("id1", "Test Source"), "Author", "Title", "Description", "URL", "URL to Image", "2024-06-18T12:00:00Z", "Content");

        newsCache.addToCache(keyword1, List.of(article));
        newsCache.addToCache(keyword2, List.of(article));

        // Wait for cache to expire
        try {
            Thread.sleep(1500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        newsCache.cleanupCache();

        assertTrue(newsCache.getFromCache(keyword1).articles().isEmpty());
        assertTrue(newsCache.getFromCache(keyword2).articles().isEmpty());
    }
    @Test
    public void testCleanupCacheWithHeadlines() {
        String keyword1 = "test1";
        String keyword2 = "test2";
        Article article = new Article(new Source("id1", "Test Source"), "Author", "Title", "Description", "URL", "URL to Image", "2024-06-18T12:00:00Z", "Content");

        newsCache.addToCache(keyword1, List.of(article));
        newsCache.addToCache(keyword2, List.of(article));
        newsCache.addToCache(ScheduledTasks.TOP_HEADLINES, List.of(article));

        // Wait for cache to expire
        try {
            Thread.sleep(1500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        newsCache.cleanupCache();

        FetchedArticleResponse headline = newsCache.getFromCache(ScheduledTasks.TOP_HEADLINES);
        assertEquals(1, headline.articles().size());
        FetchedArticleResponse keyword2Results = newsCache.getFromCache(keyword2);
        assertEquals(1, keyword2Results.articles().size());
        assertTrue(keyword2Results.headerMessage().contains("Enjoy the headlines for now."));
        FetchedArticleResponse keyword1Results = newsCache.getFromCache(keyword1);
        assertEquals(1, keyword1Results.articles().size());
        assertTrue(keyword1Results.headerMessage().contains("Enjoy the headlines for now."));

    }

    @Test
    public void testCaseInsensitivity() {
        String keyword = "TeSt";
        Article article = new Article(new Source("id1", "Test Source"), "Author", "Title", "Description", "URL", "URL to Image", "2024-06-18T12:00:00Z", "Content");

        newsCache.addToCache(keyword, List.of(article));

        FetchedArticleResponse response = newsCache.getFromCache(keyword.toLowerCase());

        assertNotNull(response);
        assertEquals(1, response.articles().size());
        assertEquals(article, response.articles().get(0));
        assertTrue(response.headerMessage().contains("Fetched results for test from cache."));
    }
}
