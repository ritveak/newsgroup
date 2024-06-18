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

## Flow diagram
![Flow Diagram](News%20Flow.png)

## Technologies Used

- **Spring Boot**: Backend framework
- **React**: Frontend framework
- **Springdoc OpenAPI**: For API documentation
- **Docker**: Containerization
- **Maven**: Build tool
- **Jenkins**: CI/CD pipeline

## Getting Started

### Prerequisites

- Java 17+
- Node.js 14+
- Maven
- Docker (for containerization)
- NewsAPI Key (You can register for a free API key at [NewsAPI](https://newsapi.org/))

# Running the Application


## Backend Setup
1. **Clone the repository**
   ```
   git clone https://github.com/your-username/news-search-microservice.git
   cd news-search-microservice
2. Configure API Key
   Update backend/src/main/resources/application.properties with your API key:
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
    http://localhost:9090/swagger-ui.html
    ```

## Frontend Setup

Navigate to the Frontend Directory:

```
cd src/main/frontend
```


Install Dependencies:
```
npm install
```

Run the Frontend Application:

```
npm start
```
The frontend will be accessible at http://localhost:3000.