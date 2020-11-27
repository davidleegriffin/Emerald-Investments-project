import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NewsPage from '../NewsPage/NewsPage';
import { Line } from "react-chartjs-2";
import HotStocks from '../WatchList/HotStocks';


function HomePage() {
  const [data, setData] = useState([]);
  const stock = "SPY";

  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=100`;
    const stockFetch = async () => {
      const response = await fetch(url);
      const quotes = await response.json();
      setData(quotes);
    }
    stockFetch();
    function refresh() {
      setInterval(stockFetch, 300000);
    }
    refresh();
  }, []);
  

  let dataPrice = [];
  let dataLabel = [];
  let dataVolume = [];
  data.forEach(quote => {
    if (quote.close) {
      dataPrice.push(quote.close);
      dataLabel.push(quote.label);
      dataVolume.push(quote.volume/quote.close);
    }
  });
  const chartData = {
    labels: [...dataLabel],
    datasets: [
      {
        label: `${stock}`,
        data: [...dataPrice],
        fill: true,
        backgroundColor: "rgba(0,50,5,0.5)",
        borderColor: "rgb(0,200,5,1)"
      }
    ]
  };
  
  return (
    <div className="main-page-container">
      <div className="stockChart">
        <h1 className="graphName">{`${stock}`}</h1>
        <Line data={chartData} />
        <div className="news-page-container">
          <NewsPage />
        </div>
      </div>
      <div className="watchlist-container">
        <HotStocks />
      </div>
    </div>
  )
};

export default HomePage;