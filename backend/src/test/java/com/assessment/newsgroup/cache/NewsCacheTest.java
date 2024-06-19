package com.assessment.newsgroup.cache;

import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.Source;
import com.assessment.newsgroup.service.ScheduledTasks;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class NewsCacheTest {

    private NewsCache newsCache;
    private List<Article> articles;
    private List<Article> topHeadlines;

    @BeforeEach
    public void setUp() {
        newsCache = new NewsCache();
        articles = List.of(
                new Article(new Source("source1 id","Source1"), "author1", "title1", "description1", "url1", "urlToImage1", "publishedAt1", "content1"),
                new Article(new Source("source2 id","Source2"), "author2", "title2", "description2", "url2", "urlToImage2", "publishedAt2", "content2")
        );
        topHeadlines = List.of(
                new Article(new Source("source3 id","Source3"), "author3", "title3", "description3", "url3", "urlToImage3", "publishedAt3", "content3"),
                new Article(new Source("source4 id","Source4"), "author4", "title4", "description4", "url4", "urlToImage4", "publishedAt4", "content4")
        );
    }

    @Test
    public void testAddToCacheAndGetFromCache() {
        newsCache.addToCache("testKeyword", articles);
        List<Article> cachedArticles = newsCache.getFromCache("testKeyword");

        assertNotNull(cachedArticles, "Cached articles should not be null");
        assertEquals(articles.size(), cachedArticles.size(), "Cached articles size should match the added articles size");
        assertEquals(articles, cachedArticles, "Cached articles should match the added articles");
    }

    @Test
    public void testGetFromCacheReturnsTopHeadlinesIfKeywordNotPresent() {
        newsCache.addToCache(ScheduledTasks.TOP_HEADLINES, topHeadlines);
        List<Article> cachedArticles = newsCache.getFromCache("nonExistingKeyword");

        assertNotNull(cachedArticles, "Cached articles should not be null");
        assertEquals(topHeadlines.size(), cachedArticles.size(), "Cached articles size should match the top headlines size");
        assertEquals(topHeadlines, cachedArticles, "Cached articles should match the top headlines");
    }

}
