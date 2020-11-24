import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NewsPage from './NewsPage';
import { Line } from "react-chartjs-2";


function HomePage() {
  const [data, setData] = useState([]);
  const stock = "AAPL";

  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=100`;
    const stockFetch = async () => {
      const response = await fetch(url);
      const quotes = await response.json();
      setData(quotes);
    }
    stockFetch();
  }, []);

  let dataPrice = [];
  let dataLabel = [];
  let dataVolume = [];
  // console.log(data);
  data.forEach(quote => {
    if (quote.close) {
      dataPrice.push(quote.close);
      dataLabel.push(quote.label);
      dataVolume.push(quote.volume/quote.close);
    }
  });
  // console.log(dataPrice);
  const chartData = {
    labels: [...dataLabel],
    datasets: [
      {
        label: `${stock}`,
        data: [...dataPrice],
        fill: true,
        backgroundColor: "rgb(0,200,5,1)",
        borderColor: "rgb(0,200,5,1)"
      }
    ]
  };
  
  return (
    <div className="main-page-container">
      <div className="stockChart">
        <h1 className="graphName">{`${stock}`}</h1>
        <Line data={chartData} />
      </div>
      <div>
        <NewsPage />
      </div>
    </div>
  )
};

export default HomePage;