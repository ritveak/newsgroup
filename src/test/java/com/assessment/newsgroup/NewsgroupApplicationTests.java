package com.assessment.newsgroup;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class NewsgroupApplicationTests {

	@Autowired
	private ApplicationContext applicationContext;
	@Test
	void contextLoads() {
	}
	@Test
	void main() {
		NewsgroupApplication.main(new String[] {});
		// If no exceptions are thrown, the test will pass
	}

	@Test
	void testBeanLoad() {
		// Check if a specific bean is loaded in the context
		assertThat(applicationContext.containsBean("newsController")).isTrue();
	}
}
