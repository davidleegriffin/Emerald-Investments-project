import React, { useState, useEffect } from 'react';
import './NewsDetailPage.css';
import NewsPageDetail from './NewsPageDetail';

function NewsPage(props) {
  const [news, setNews] = useState([]);
  const stock = props.value;
  // console.log("newstock", stock);

  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/${stock}/news/last/7?token=pk_28ed5007f5f944b4bb34a679e72f21fe`;
    if(stock) {
      const stockNewsFetch = async () => {
        const response = await fetch(url);
        const news = await response.json();
        setNews(news);
      }
      stockNewsFetch();
    }
  }, [stock]);

  return (
    <div className="news-banner">
       {news.map(story => <NewsPageDetail key={story.headline} props={story} />)}
    </div>
  );

};

export default NewsPage;
