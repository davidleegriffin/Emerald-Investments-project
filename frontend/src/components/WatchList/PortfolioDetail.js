import React from 'react';
import './WatchList.css';

function PortfolioDetail(props) {
  console.log('portfolioDetail', props.stock);

  const stockFetch = async () => {
    const response = await fetch(`https://cloud.iexapis.com/stable/stock/${ props.stock }/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=400`);
    const quotes = await response.json();
    console.log("detailQuotes", quotes);
  };

  stockFetch();

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
