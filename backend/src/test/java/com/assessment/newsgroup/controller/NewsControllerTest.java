//package com.assessment.newsgroup.controller;
//import com.assessment.newsgroup.model.Article;
//import com.assessment.newsgroup.model.CustomChronoUnit;
//import com.assessment.newsgroup.model.Source;
//import com.assessment.newsgroup.service.NewsApiService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.List;
//import java.util.Map;
//
//import static org.mockito.ArgumentMatchers.anyBoolean;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//
//@WebMvcTest(NewsController.class)
//public class NewsControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private NewsApiService newsService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testSearchNewsSuccess() throws Exception {
//        // Prepare mock response
//        Map<String, List<Article>> mockResponse = Map.of(
//                "2024-06-07T00:00+05:30[Asia/Kolkata]", List.of(
//                        new Article(new Source("id1","Test Title"), "author", "title", "description", "url", "urlToImage", "publishedAt", "content")
//                )
//        );
//        when(newsService.searchNews(anyString(), anyLong(), any(CustomChronoUnit.class), anyBoolean())).thenReturn(mockResponse);
//
//        // Perform GET request
//        mockMvc.perform(get("/search")
//                        .param("keyword", "test")
//                        .param("interval", "12")
//                        .param("unit", "HOURS")
//                        .param("isOfflineMode", "false"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.['2024-06-07T00:00+05:30[Asia/Kolkata]']").isArray())
//                .andExpect(jsonPath("$.['2024-06-07T00:00+05:30[Asia/Kolkata]'][0].title").value("title"));
//    }
//    @Test
//    public void testSearchNewsSuccessWithLowerCaseUnit() throws Exception {
//        // Prepare mock response
//        Map<String, List<Article>> mockResponse = Map.of(
//                "2024-06-07T00:00+05:30[Asia/Kolkata]", List.of(
//                        new Article(new Source("id1","Test Title"), "author", "title", "description", "url", "urlToImage", "publishedAt", "content")
//                )
//        );
//        when(newsService.searchNews(anyString(), anyLong(), any(CustomChronoUnit.class), anyBoolean())).thenReturn(mockResponse);
//
//        // Perform GET request
//        mockMvc.perform(get("/search")
//                        .param("keyword", "test")
//                        .param("interval", "12")
//                        .param("unit", "hours")
//                        .param("isOfflineMode", "false"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.['2024-06-07T00:00+05:30[Asia/Kolkata]']").isArray())
//                .andExpect(jsonPath("$.['2024-06-07T00:00+05:30[Asia/Kolkata]'][0].title").value("title"));
//    }
//
//    @Test
//    public void testSearchNewsWithDefaults() throws Exception {
//        // Prepare mock response
//        Map<String, List<Article>> mockResponse = Map.of(
//                "2024-06-07T00:00+05:30[Asia/Kolkata]", List.of(
//                        new Article(new Source("id1","Test Title"), "author", "title", "description", "url", "urlToImage", "publishedAt", "content")
//                )
//        );
//        when(newsService.searchNews(anyString(), anyLong(), any(CustomChronoUnit.class), anyBoolean())).thenReturn(mockResponse);
//
//        // Perform GET request with default parameters
//        mockMvc.perform(get("/search")
//                        .param("keyword","test")
//                )
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.['2024-06-07T00:00+05:30[Asia/Kolkata]']").isArray())
//                .andExpect(jsonPath("$.['2024-06-07T00:00+05:30[Asia/Kolkata]'][0].title").value("title"));
//    }
//
//    @Test
//    public void testSearchNewsTypeMismatchInterval() throws Exception {
//        // Perform GET request with invalid parameters
//        mockMvc.perform(get("/search")
//                        .param("keyword","test")
//                        .param("interval", "invalid"))
//                .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    public void testSearchNewsInvalidUnit() throws Exception {
//        // Perform GET request with invalid unit parameter
//        mockMvc.perform(get("/search")
//                        .param("keyword", "test")
//                        .param("interval", "12")
//                        .param("unit", "INVALID_UNIT")
//                        .param("isOfflineMode", "false"))
//                .andExpect(status().isBadRequest())
//                .andExpect(jsonPath("$").value("Invalid unit: INVALID_UNIT"));
//    }
//
//    @Test
//    public void testSearchNewsServerError() throws Exception {
//        // Prepare mock to throw an exception
//        when(newsService.searchNews(anyString(), anyLong(), any(CustomChronoUnit.class), anyBoolean()))
//                .thenThrow(new RuntimeException("Internal Server Error"));
//
//        // Perform GET request
//        mockMvc.perform(get("/search")
//                        .param("keyword", "test")
//                        .param("interval", "12")
//                        .param("unit", "HOURS")
//                        .param("isOfflineMode", "false"))
//                .andExpect(status().isInternalServerError());
//    }
//}
