import React from 'react';
import './WatchList.css';

function PortfolioDetail(props) {
  console.log('portfolioDetail', props.stock)
  if (props.stock === 'undefined') {
    return ('');
  } else {
    return (
      <div className="portfolio-container">
        <div>
          <div className="stock-symbol-portfolio">{props.stock.toUpperCase()}</div>
        </div>
      </div>
    )
  }
}

export default PortfolioDetail;
