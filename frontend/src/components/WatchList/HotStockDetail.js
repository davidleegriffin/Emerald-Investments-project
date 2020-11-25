import React from 'react';
import './WatchList.css';

function HotStockDetail(props) {
  const movers = props.props;
  console.log(movers);
  return (
    <div className="mover-container">
      <div className="stock-symbol">
        <h1>
          <p>{movers.symbol}
          <span className="price-change">
          <img className="green-arrow" src="./images/up-green-arrow.png" width="30px" />
            {movers.change}
          </span></p>
        </h1>
        {movers.companyName}
      </div>
      <div className="overlay">
      <div className="companyName">{movers.companyName}</div>
      <div className="latestPrice">{`${movers.symbol}   -   `}Latest Price: ${movers.latestPrice}</div>
      <div className="latestTime">{ movers.latestTime }</div>
      </div>
    </div>
  );
}

export default HotStockDetail;