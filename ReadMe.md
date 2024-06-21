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

## Jenkins Setup

To set up Jenkins for Continuous Integration (CI) and Continuous Deployment (CD) of the Newsgroup application, follow these steps:

### Prerequisites

- A running Jenkins server.
- Jenkins plugins: Git, NodeJS, Maven Integration, Docker Pipeline.

### Steps

1. **Install Jenkins and Plugins:**
    - Install Jenkins on your server or local machine.
    - Install the required Jenkins plugins (Git, NodeJS, Maven Integration, Docker Pipeline).

2. **Create Jenkins Pipeline:**
    - Open Jenkins and create a new pipeline job.

3. **Configure Jenkins Pipeline to Use SCM:**

    - In the pipeline job configuration, scroll down to the **Pipeline** section.
    - Choose **Pipeline script from SCM**.
    - Select **Git** from the SCM dropdown menu.
    - Enter this repository's URL in the **Repository URL** field.
    - Add your credentials by clicking **Add** next to **Credentials** and entering your Git credentials (username and password/token).
    - In the **Branch Specifier** field, enter the branch "main".
    - In the **Script Path** field, enter Jenkinsfile.

4. **Save and Build:**
    - Save the configuration and trigger the Jenkins job to run the pipeline.
    - Verify that it successfully checks out the code from your repository, builds, tests the application.


### Access Swagger UI
   Open your web browser and navigate to:
    ```
    http://localhost:9090/swagger-ui.html
    ```
### API Endpoints
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
curl -X GET "http://localhost:9090/search?keyword=apple&interval=12&unit=HOURS" -H "accept: application/json"
```
Example Response
```json
{
  "2024-06-18T12:00+05:30[Asia/Kolkata]": [
    {
      "source": {
        "id": null,
        "name": "Yahoo Entertainment"
      },
      "author": "Valentina Palladino",
      "title": "WWDC 2024: Everything Apple announced today including iOS 18, AI with Apple Intelligence and more",
      "description": "Today's keynote for Apple's Worldwide Developers Conference teased a lot of what users can expect later this year when all of its major software updates roll out. Big changes coming to iOS 18, macOS Sequoia and watchOS 11 include RCS support, a new Passwords …",
      "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_8823786c-90f4-4b30-8198-1d295ab9a66c",
      "urlToImage": null,
      "publishedAt": "2024-06-10T18:44:22Z",
      "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Yahoo Entertainment"
      },
      "author": "Devindra Hardawar",
      "title": "Apple's AI push will reportedly be called Apple Intelligence, of course",
      "description": "Just a few days before Apple's Worldwide Developer's Conference (WWDC 2024) kicks off, Bloomberg's Mark Gurman has delivered his final round of party-spoiling details. The biggest takeaway: Apple will call its long-rumored artificial intelligence play \"Apple …",
      "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_3beaf018-e403-4758-9b9a-93b47390be5b",
      "urlToImage": null,
      "publishedAt": "2024-06-07T13:48:41Z",
      "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
    },
    {
      "source": {
        "id": "the-verge",
        "name": "The Verge"
      },
      "author": "Andrew Webster",
      "title": "Apple’s Pachinko returns for season 2 in August",
      "description": "Apple has announced that season 2 of Pachinko, its generation-spanning historical drama, will start streaming on Apple TV Plus in August.",
      "url": "https://www.theverge.com/2024/5/30/24167812/pachinko-season-2-apple-tv-plus-release-date",
      "urlToImage": "https://cdn.vox-cdn.com/thumbor/lJEbJWuLwU6Pm1J_R-PH_uAcAu0=/0x0:3840x1918/1200x628/filters:focal(1920x959:1921x960)/cdn.vox-cdn.com/uploads/chorus_asset/file/25470597/Pachinko_203_F00314F.jpg",
      "publishedAt": "2024-05-30T21:00:00Z",
      "content": "Apples Pachinko returns for season 2 in August\r\nApples Pachinko returns for season 2 in August\r\n / The generation-spanning drama will start streaming again in the summer.\r\nByAndrew Webster, an entert… [+1439 chars]"
    }
  ]
}

```
