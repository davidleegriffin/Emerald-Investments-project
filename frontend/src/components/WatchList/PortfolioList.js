import React from 'react';
import PortfolioDetail from './PortfolioDetail';
import './WatchList.css';
const PortfolioList = (props) => {
  let arrPortfolio = [];
  const stocks = (props.portfolio);
  console.log("stocks", stocks);
  // for (let key of Object.entries(stocks)) {
  //   console.log("key", key);
  //   arrPortfolio.push(key.toUpperCase());
  // }
  // console.log("stock-portfolio", Object.keys(stocks));

  // arrPortfolio.push(Object.keys(stocks));
    // portfolio[stock] = 0;
    // const portfolioArray = Object.keys(portfolio);
    // console.log('portList', portfolioArray, stock);
  

    return (
      <div className="mover-container">
        <h1 className="portfolio-banner">Portfolio</h1>
        <div>{}</div>
      </div>
    );
};

export default PortfolioList;
