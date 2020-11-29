import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NewsPage from '../NewsPage/NewsPage';
import { Line } from "react-chartjs-2";
import HotStocks from '../WatchList/HotStocks';
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";


function HomePage() {
  const sessionUserId = useSelector(state => state.session.user.id);
  const [data, setData] = useState([]);
  const [shares, setShares] = useState(0);
  const [stockSymbol, setStockSymbol] = useState('');
  const [userId, setUserId] = useState(1);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  
  const handleChange = (e) => {
    e.preventDefault();
  };

  const handleShares = (e) => {
    e.preventDefault();
    setShares(e.target.value);
  }
  
  const handleSearch = (e) => {
    let input = document.getElementById('search-field');
    setStockSymbol(input.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserId(sessionUserId);
    setErrors([]);
    return dispatch(sessionActions.portfolioAdd({ stockSymbol, shares, userId }))
    .catch(res => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });

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
        label: `${stockSymbol}`.toUpperCase(),
        data: [...dataPrice],
        fill: true,
        backgroundColor: "rgba(0,50,5,0.5)",
        borderColor: "rgb(0,200,5,1)"
      }
    ]
  };
  
  return (
    <div className="main-page-container">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
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
      <div>
        <form onSubmit={handleSubmit} id="portfolio-form">
          <label className="shares-input">
            Shares
            <input
              type="text"
              // value='shares'
              onChange={handleShares}
              required
            />
          </label>
          <button className="add-portfolio" type="submit">Add</button>
        </form>
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