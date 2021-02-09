import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NewsPage from '../NewsPage/NewsPage';
import { Line } from "react-chartjs-2";
import HotStocks from '../WatchList/HotStocks';
import PortfolioList from '../WatchList/PortfolioList';
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";


function HomePage(isLoaded) {
  const sessionUser = useSelector(state => state.session.user);
  const [data, setData] = useState([]);
  const [shares, setShares] = useState(0);
  const [stockSymbol, setStockSymbol] = useState();
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [portfolio, setPortfolio] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setStockSymbol(e.target.value);
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
    setUserId(sessionUser.id);
    setErrors([]);
    setPortfolio(stockSymbol);
    // console.log('post-push', portfolio)
    return dispatch(sessionActions.portfolioAdd({ stockSymbol, shares, userId }))
    .catch(res => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });

  }

  useEffect(() => {
    const getPortfolio = async () => {
      let userPortfolio = {};
      const resTest = await fetch(`api/portfolio`);
      const quoteTest = await resTest.json();
      for (let i = 0; i < quoteTest.length; i++) {
        // console.table("quoteTest", quoteTest[i]);
        let currentValue = quoteTest[i].stockSymbol;
        if (userPortfolio[currentValue] === undefined) {
          userPortfolio[currentValue] = quoteTest[i].shares;
        } else {
          userPortfolio[currentValue] += quoteTest[i].shares;
        }
      }
      setPortfolio(userPortfolio);
    }
    getPortfolio();
  }, []);
  
  // console.log("portfolio", portfolio);

  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/${stockSymbol}/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=400`;
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
  // let dataVolume = [];
  data.forEach(quote => {
    if (quote.close) {
      dataPrice.push(quote.close);
      dataLabel.push(quote.label);
    }
  });

  let priceDifference = (dataPrice[dataPrice.length-1]) - (dataPrice[0]);
  let lineColor="";
  if(priceDifference >= 0) {
    lineColor="green";
  } else {
    lineColor="red";
  }

  const chartData = {
    labels: [...dataLabel],
    datasets: [
      {
        label: `${stockSymbol}`.toUpperCase(),
        data: [...dataPrice],
        fill: false,
        backgroundColor: "rgba(0,50,5,0.5)",
        borderColor: `${lineColor}`
      }
    ]
  };

  // console.log('dataPrice', dataPrice[dataPrice.length - 1]);

  let portfolioList;

  if (sessionUser) {
    portfolioList = (
      <PortfolioList portfolio={ portfolio }/>
    );
  } else {
    portfolioList = (
      <HotStocks />
    );
  }

  return (
    <div className="main-page-container">
      <div className="search-div">
          <button className="search-button" onClick={handleSearch}><img src="./images/magnify-glass.png" width="20" /></button>
          <input
          id="search-field"
          type="text"
          placeholder="Enter Stock Symbol"
          defaultValue="SPY"
          // value={`${stockSymbol}`}
          onChange={handleChange}
          />
      </div>
      <div>
        <form onSubmit={handleSubmit} id="portfolio-form">
          <label className="shares-input">
            <input
              type="text"
              id="shares-field"
              onChange={handleShares}
              required
            />
          </label>
          <button className="add-portfolio" type="submit">Add Shares to Portfolio</button>
        </form>
      </div>
      <div className="stockChart">
        <span className="banner__container">
          <h1 className="graphName">{`${stockSymbol}`.toUpperCase()}</h1>
          <h1 className="graphName">${`${dataPrice[dataPrice.length - 1]}`}</h1>
        </span>
        <Line id="chart" data={chartData} />
        <div className="news-page-container">
          <NewsPage value={stockSymbol} />
        </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      <div className="watchlist-container">
        {isLoaded && portfolioList}
      </div>
    </div>
  )
};

export default HomePage;
