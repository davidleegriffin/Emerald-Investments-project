import React from 'react';
import './WatchList.css';

function HotStockDetail(props) {
  const movers = props.props;
  
  return (
    <div className="mover-container">
      <div className="stock-symbol">
        <h2>
          <p>{movers.symbol}
          <img className="green-arrow" src="./images/up-green-arrow.png" width="30px" alt="up-arrow" />
        
          <span className="price-change">
          {movers.change}
          </span></p></h2>
        {movers.companyName}
      </div>
      <div className="overlay">
        <div className="companyName">{movers.companyName}</div>
        <div className="sub-overlay-container">
          <div className="latestPrice">{`${movers.symbol}   -   `}Latest Price: ${movers.latestPrice}</div>
          <div className="volume"><span>volume:</span><div>{movers.volume }</div></div> 
          <div className="latestTime">{movers.latestTime}</div>
          <div className="details-wrapper"> 
            <div className="marketCap"><span className="details-label">market capitalization:<br></br></span>$<span>{movers.marketCap }</span></div> 
            <div className="changePercent"><span className="details-label">percent change:<br></br></span>%<span>{movers.changePercent }</span></div> 
            <div className="week52High"><span className="details-label">52 Week High:<br></br></span><span>{movers.week52High }</span></div> 
            <div className="week52Low"><span className="details-label">52 Week Low:<br></br></span><span>{movers.week52Low }</span></div> 
            <div className="extendedChange"><span className="details-label">change after hours:<br></br></span><span>{(movers.extendedChange) ? movers.extendedChange : 'N/A' }</span></div> 
            <div className="extendedPrice"><span className="details-label">extended hours price:<br></br></span><span>{(movers.extendedPrice) ? movers.extendedPrice : 'N/A' }</span></div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotStockDetail;