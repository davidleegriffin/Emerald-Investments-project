import React, {useState} from 'react';
import PortfolioDetail from './PortfolioDetail';
import { useSelector } from "react-redux";
import './WatchList.css';


const PortfolioList = () => {
  const statePortfolio = useSelector(state => state.portfolio.portfolio);
  // console.log("statePortfolio", statePortfolio);
  let arrPortfolio = [];

  if (statePortfolio) {
    for (let i = 0; i < statePortfolio.length; i++) {
      if (arrPortfolio.includes(statePortfolio[i].stockSymbol)) {
        continue;
      }
      arrPortfolio.push(statePortfolio[i].stockSymbol);
    }
  }

  // console.log("arrPortfolio", arrPortfolio);
  // console.log("statePortfolio", statePortfolio);

  if (statePortfolio) {
    let shares = 0;
    let sum = 0;
    for (let i=0; i<statePortfolio.length; i++) {
      console.log("state-for", statePortfolio[i]);
      shares = statePortfolio[i].shares;
      // console.log("shares", shares);
      const stockFetch = async () => {
        const response = await fetch(`https://cloud.iexapis.com/stable/stock/${statePortfolio[i].stockSymbol}/book?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=1`);
        const quotes = await response.json();
        // console.log("quotes", (quotes.quote.latestPrice * shares));
        sum += (quotes.quote.latestPrice * shares);
        console.log("sum", sum);
      };
      stockFetch();
    }

  }


  return (
    <div className="mover-container">
      <div>{arrPortfolio.map((stock,idx) => <PortfolioDetail key={idx} stock={stock} />)}</div>
    </div>
  );
};

export default PortfolioList;
