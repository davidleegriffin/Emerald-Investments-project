import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NewsPage from '../NewsPage/NewsPage';
import { Line } from "react-chartjs-2";
import HotStocks from '../WatchList/HotStocks';


function HomePage() {
  const [data, setData] = useState([]);
  const [stockSymbol, setStockSymbol] = useState('');
  
  
  const handleChange = (e) => {
    e.preventDefault();
  };
  
  const handleSearch = (e) => {
    let input = document.getElementById('search-field');
    setStockSymbol(input.value);
  }

  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/${stockSymbol}/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=100`;
    const stockFetch = async () => {
      const response = await fetch(url);
      const quotes = await response.json();
      setData(quotes);
    }
    window.onload = handleSearch();
    stockFetch();
    function refresh() {
      setInterval(stockFetch, 300000);
    }
    refresh();
  }, [stockSymbol]);
  

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
        label: `${stockSymbol}`,
        data: [...dataPrice],
        fill: true,
        backgroundColor: "rgba(0,50,5,0.5)",
        borderColor: "rgb(0,200,5,1)"
      }
    ]
  };
  
  return (
    <div className="main-page-container">
      <div className="search-div">
        <input
        id="search-field"
        type="text"
        placeholder="Enter Stock Symbol"
        defaultValue="SPY"  
        // value={`${stockSymbol}`}  
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
      <div className="stockChart">
        <h1 className="graphName">{`${stockSymbol}`.toUpperCase()}</h1>
        <Line data={chartData} />
        <div className="news-page-container">
          <NewsPage value={stockSymbol} />
        </div>
      </div>
      <div className="watchlist-container">
        <HotStocks />
      </div>
    </div>
  )
};

export default HomePage;