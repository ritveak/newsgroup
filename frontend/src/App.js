import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import NewsList from './components/NewsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsNavbar from './components/Navbar';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [headerMessage, setHeaderMessage] = useState([]);
  const [interval, setInterval] = useState([]);
  const [unit, setUnit] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOffline, setIsOffline] = useState('');

  const handleSearch = (keyword,interval,unit,isOfflineMode) => {
    setInterval(interval);
    setUnit(unit);
    fetch(`/search?keyword=${keyword}&interval=${interval}&unit=${unit}&isOfflineMode=${isOfflineMode}`)
        .then((response) => response.json())
        .then((data) => {setArticles(data.result);setHeaderMessage(data.headerMessage);})
        .catch((error) => console.error('Error fetching news:', error));
};

return (
    <div>
      <NewsNavbar 
      searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
      interval={interval} setInterval={setInterval} 
      unit={unit} setUnit={setUnit} 
      isOffline={isOffline} setIsOffline={setIsOffline} 
      handleSearch={handleSearch} />        
      <h1 style={{marginTop:'10px'}}>News Search App</h1>
      
        {/* <SearchBar onSearch={handleSearch} /> */}
        <NewsList headerMessage ={headerMessage} articles={articles} interval={interval} unit ={unit}  />
        {/* <NewsList articles={sampleArticle} /> */}
    </div>
);
};

export default App;