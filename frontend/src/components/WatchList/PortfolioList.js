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
      console.log("statePortfolio", statePortfolio[i].stockSymbol); 
      if (arrPortfolio.includes(statePortfolio[i].stockSymbol)) {
        continue;
      } 
      arrPortfolio.push(statePortfolio[i].stockSymbol);
    }  
  }

  return (
    <div className="mover-container">
      <div>{arrPortfolio.map((stock,idx) => <PortfolioDetail key={idx} stock={stock} />)}</div>
    </div>
  );
};

export default PortfolioList;
