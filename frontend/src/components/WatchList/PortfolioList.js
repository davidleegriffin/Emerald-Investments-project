import React, {useState} from 'react';
import PortfolioDetail from './PortfolioDetail';
import { useSelector } from "react-redux";
import './WatchList.css';


const PortfolioList = () => {
  const statePortfolio = useSelector(state => state.portfolio.portfolio);
  // console.log("statePortfolio", statePortfolio);
  let arrPortfolio = [];

  if (statePortfolio) {
    let shares = 0;
    for (let i=0; i<statePortfolio.length; i++) {
      shares = statePortfolio[i].shares;
      // eslint-disable-next-line no-loop-func
      const stockFetch = async () => {
        const response = await fetch(`https://cloud.iexapis.com/stable/stock/${statePortfolio[i].stockSymbol}/book?token=pk_28ed5007f5f944b4bb34a679e72f21fe&chartLast=1`);
        const quotes = await response.json();
        // console.log("quotes", (quotes.quote.latestPrice * shares));
        statePortfolio[i].mktValue = (quotes.quote.latestPrice * shares);
      };
      stockFetch();
    }
  }

  if (statePortfolio) {
    for (let i = 0; i < statePortfolio.length; i++) {
      arrPortfolio.push(statePortfolio[i]);
    }
  }

  // console.log("arrPortfolio", arrPortfolio);
  // console.log("statePortfolio", statePortfolio);



  return (
    <div className="mover-container">
      <div>{arrPortfolio.map((stock,idx) => <PortfolioDetail key={idx} stock={stock} />)}</div>
    </div>
  );
};

export default PortfolioList;
