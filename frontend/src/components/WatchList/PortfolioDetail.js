import React from 'react';
import './WatchList.css';

function PortfolioDetail(props) {
  console.log('portfolioDetail', props.stocks)
  if (props.stocks === 'undefined') {
    return ('');
  } else {
    return (
      <div className="portfolio-container">
        <div>
          <div className="stock-symbol-portfolio">{props.stocks.toUpperCase()}</div>
        </div>
      </div>
    )
  }
}

export default PortfolioDetail;