# News Search Microservice

## Overview

This project is a Spring Boot-based microservice that allows users to search for news articles based on a keyword. The results are grouped by date intervals specified by the user. The service uses the NewsAPI's `Everything` endpoint to fetch news articles.

## Features

- **Search News**: Search for news articles based on a keyword.
- **Group Results**: Group news articles by specified date intervals (last N minutes, hours, days, weeks, months, years).
- **Default Interval**: If no interval is specified, results are grouped in 12-hour intervals.
- **Production Ready**: The service is designed to be production-ready, with considerations for performance, optimization, and security.
- **Offline Mode**: Supports offline mode with toggles to handle cases when the underlying dependencies (e.g., Public API) are not available.
- **Error Handling**: Returns relevant results even when underlying dependencies are unavailable.
- **Swagger Integration**: Provides an interactive API documentation interface using Springdoc OpenAPI.

## Technologies Used

- **Spring Boot**: Backend framework
- **React**: Frontend framework
- **Springdoc OpenAPI**: For API documentation
- **Docker**: Containerization
- **Maven**: Build tool
- **Jenkins**: CI/CD pipeline

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven
- Docker (for containerization)
- NewsAPI Key (You can register for a free API key at [NewsAPI](https://newsapi.org/))

### Running the Application

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/news-search-microservice.git
   cd news-search-microservice
2. Configure API Key
   Update the application.properties file with your NewsAPI key:
    ```
    newsapi.key=YOUR_NEWSAPI_KEY
    ```
3. Build and Run the Application
    ```
   mvn clean install
   mvn spring-boot:run
   ```
4. Access Swagger UI
   Open your web browser and navigate to:
    ```
    http://localhost:8080/swagger-ui.html
    ```
API Endpoints
Search News

    URL: /search
    Method: GET
    Parameters:
        keyword (optional): The keyword to search for.
        interval (optional): The interval for grouping results (default: 12).
        unit (optional): The unit for the interval (default: HOURS).
    Response: A map containing grouped news articles.

Example Request
```
curl -X GET "http://localhost:8080/search?keyword=apple&interval=12&unit=HOURS" -H "accept: application/json"
```
Example Response
```json
{
  "2023-06-13T12:00:00": [
    {
      "title": "Apple announces new product",
      "description": "Apple has announced a new product...",
      "publishedAt": "2023-06-13T12:34:56Z",
      "url": "https://example.com/news/apple-new-product"
    }
  ],
  "2023-06-13T00:00:00": [
    {
      "title": "Stock prices for Apple soar",
      "description": "The stock prices for Apple have soared...",
      "publishedAt": "2023-06-13T01:23:45Z",
      "url": "https://example.com/news/apple-stock-prices"
    }
  ]
}

```