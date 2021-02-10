import React from 'react';
import './WatchList.css';
import { Line } from "react-chartjs-2";
import { withConverter } from 'js-cookie';

function PortfolioDetail(props) {
  console.log('portfolioDetail', props.stock);

  let dataPrice = [];
  let dataLabel = [];

  const stockFetch = async () => {
    const response = await fetch(`https://cloud.iexapis.com/stable/stock/${ props.stock }/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=40`);
    const quotes = await response.json();
    quotes.forEach(quote => {
      if (quote.close) {
        dataPrice.push(quote.close);
        dataLabel.push(quote.label);
      }
    });
    return quotes;
  };

  stockFetch();

  console.log("dataPrice", dataPrice);
  // let quotes = stockFetch();
  // console.log("stockfetch", quotes);

  const options = {
    width: "100",
    height: "100",
    responsive: true,
    maintainAspectRatio: true,
  }

  const chartData = {
    labels: [...dataLabel],
    datasets: [
      {
        label: `${props.stock}`.toUpperCase(),
        data: [...dataPrice],
        fill: true,
        backgroundColor: "rgba(255,250,255,0.5)",
        borderColor: "green",
      }
    ]
  };

  if (props.stock === 'undefined') {
    return ('');
  } else {
    return (
      <div className="portfolio-container">
        <div>
          <div className="stock-symbol-portfolio">{props.stock.toUpperCase()}
            <Line id="portfolioChart" data={chartData} options={options}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PortfolioDetail;
