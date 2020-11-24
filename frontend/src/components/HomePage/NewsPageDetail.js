import React, { useState, useEffect } from 'react';
import './HomePage.css';

function NewsPageDetail() {
  const [news, getNews] = useState([]);
  getNews(news);

  return (
    <h1>{console.log(news)}</h1>
  )
}

export default NewsPageDetail;