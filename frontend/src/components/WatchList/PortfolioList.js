import React from 'react';
import PortfolioDetail from './PortfolioDetail';
import './WatchList.css';
const PortfolioList = (props) => {
  let arrPortfolio = [];
  const stocks = (props.portfolio);
  console.log("props", (props.portfolio));
  for (let sym in stocks) {
    console.log("sym", sym);
    arrPortfolio.push(sym);
  }
  console.log("arrPortfolio", arrPortfolio);

    return (
      <div className="mover-container">
        <h1 className="portfolio-banner">Portfolio</h1>
        <div></div>
      </div>
    );
};

export default PortfolioList;
