import React from 'react';
import Card from 'react-bootstrap/Card';
import defaultImage from '../news.png'; // Import your local image

const NewsList = ({ articles }) => {
    const renderArticlesByDate = () => {
        let renderedArticles = [];

        for (const [date, articlesInDate] of Object.entries(articles)) {
            renderedArticles.push(
                <div key={date} style={{height:'48rem'}}>
                    <h8>{new Date(date).toLocaleDateString()}</h8>
                    <div className="card-deck d-flex flex-nowrap overflow-auto">
                        {renderArticles(articlesInDate)}
                    </div>
                </div>
            );
        }

        return renderedArticles;
    };

    const renderArticles = (articles) => {
        return articles.map((article, index) => (
            <Card key={index} style={{minWidth: '18rem', maxWidth: '18rem', flex: '0 0 auto' }}>
                <Card.Img
                    variant="top"
                    src={article.urlToImage ? article.urlToImage : defaultImage} // Use defaultImage if article.urlToImage is falsy
                    alt={article.title}
                    style={{width:'18rem'}}
                />
                <Card.Body>
                    <Card.Title style={{height:'9rem'}}>{article.title}</Card.Title>
                    <hr style={{width:'80%'}}></hr>
                    <Card.Text>{truncateText(article.description)}</Card.Text>
                    <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read more</a>
                    <p className="card-text"><small className="text-muted">{new Date(article.publishedAt).toLocaleString()}</small></p>
                </Card.Body>
            </Card>
        ));
    };
        // Function to truncate text to a specified length
        const truncateText = (text, maxLength = 100) => {
            if (text.length <= maxLength) return text;
            return text.slice(0, maxLength) + '...';
        };

    return (
        <div>
            {renderArticlesByDate()}
        </div>
    );
};

export default NewsList;
