import React from 'react';
import PortfolioDetail from './PortfolioDetail';
import './WatchList.css';
let portfolio = {};
const PortfolioList = (props) => {
    const stock = (props.portfolio)
    portfolio[stock] = 0;
    const portfolioArray = Object.keys(portfolio);
    console.log('portList', portfolioArray, stock);
  
    return (
      <div className="mover-container">
        <h1 className="portfolio-banner">Portfolio</h1>
        <div>{portfolioArray.map((stocks,idx) => <PortfolioDetail key={idx} stocks={stocks} />)}</div>
      </div>
    );
};

export default PortfolioList;