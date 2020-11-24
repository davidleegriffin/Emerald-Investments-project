import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NewsPageDetail from './NewsPageDetail';

function NewsPage() {
  const [news, setNews] = useState([]);
  const stock = "AAPL";

  
  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/${stock}/news/last/7?token=pk_797fccfaec704ed4909e8ac1156e1db9`;
    const stockNewsFetch = async () => {
      const response = await fetch(url);
      const news = await response.json();
      setNews(news);
    }
    stockNewsFetch();
  }, []);
  
  console.log(news);
  return (
    <div className="news-banner">
      {news.map(story => {<img className="news-image" src={`${story.image}`} />})}
    </div>
  );

};

export default NewsPage;