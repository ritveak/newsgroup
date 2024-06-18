import React from 'react';
import Card from 'react-bootstrap/Card';
import defaultImage from '../news.png'; // Import your local image
import { DateTime } from 'luxon';

const NewsList = ({ articles, interval,unit}) => {
    const renderArticlesByDate = () => {
        let renderedArticles = [];
       
        
const adjustStartDate = (startDate, interval, unit, index) => {
    switch (unit) {
        case 'MINUTES':
            return startDate.minus({ minutes: interval * (index + 1) });
        case 'HOURS':
            return startDate.minus({ hours: interval * (index + 1) });
        case 'DAYS':
            return startDate.minus({ days: interval * (index + 1) });
        case 'WEEKS':
            return startDate.minus({ weeks: interval * (index + 1) });
        case 'MONTHS':
            return startDate.minus({ months: interval * (index + 1) });
        case 'YEARS':
            return startDate.minus({ years: interval * (index + 1) });
        default:
            return startDate;
    }
}

        for (const [date, articlesInDate] of Object.entries(articles)) {
            console.log(date);
            const endDate = DateTime.fromISO(date);
    let startDate = endDate;

    startDate = adjustStartDate(startDate, interval, unit, renderedArticles.length);
    const startDateString = startDate.toLocaleString(DateTime.DATE_SHORT);
    const endDateString = endDate.toLocaleString(DateTime.DATE_SHORT);


            renderedArticles.push(
                <div key={date} style={{height:'48rem'}}>
                  
            <h8>
                {`Interval ${renderedArticles.length+1}: Articles from ${startDateString} to ${endDateString} [${articlesInDate.length} Articles]`}
            </h8>
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
