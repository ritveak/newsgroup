package com.assessment.newsgroup.controller;

import com.assessment.newsgroup.controller.NewsController;
import com.assessment.newsgroup.model.CustomChronoUnit;
import com.assessment.newsgroup.service.NewsApiService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(NewsController.class)
public class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NewsApiService newsService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testHandleRuntimeException() throws Exception {
        when(newsService.searchNews("test", 12L, CustomChronoUnit.HOURS, false))
                .thenThrow(new RuntimeException("Internal Server Error"));

        mockMvc.perform(get("/search")
                        .param("keyword", "test")
                        .param("interval", "12")
                        .param("unit", "HOURS")
                        .param("isOfflineMode", "false"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Internal Server Error"));
    }

    @Test
    public void testHandleMethodArgumentTypeMismatchException() throws Exception {
        // Simulate MethodArgumentTypeMismatchException
        mockMvc.perform(get("/search")
                        .param("interval", "invalid")) // Invalid value for a long parameter
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testHandleMethodArgumentNotValidException() throws Exception {
        // Simulate MethodArgumentNotValidException
        mockMvc.perform(get("/search")
                        .param("interval", "12")
                        .param("unit", "HOURS")
                        .param("isOfflineMode", "false"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testHandleIllegalArgumentException() throws Exception {
        // Simulate IllegalArgumentException
        mockMvc.perform(get("/search")
                        .param("keyword", "test")
                        .param("interval", "12")
                        .param("unit", "INVALID_UNIT") // Invalid unit
                        .param("isOfflineMode", "false"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Invalid unit: INVALID_UNIT"));
    }
}
