// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [interval, setInterval] = useState('');
    const [unit, setUnit] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(keyword,interval,unit);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter Keyword to search."
            />
            <input
                type="text"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                placeholder="Enter Interval value"
            />
            <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Enter Interval Unit"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
