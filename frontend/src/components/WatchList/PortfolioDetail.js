import React, { useState, useEffect } from 'react';
import './WatchList.css';
import { Line } from "react-chartjs-2";

function PortfolioDetail(props) {
  const [data, setData] = useState([]);
  console.log('portfolioDetail', props.stock);

  useEffect(() => {
    const stockFetch = async () => {
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${props.stock}/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=40`);
      const quotes = await response.json();
      setData(quotes);
    }
    stockFetch();
  }, []);
   
  let dataPrice = [];
  let dataLabel = [];
  data.forEach(quote => {
    if (quote.close) {
      dataPrice.push(quote.close);
      dataLabel.push(quote.label);
    }
  });

  let priceDifference = (dataPrice[dataPrice.length-1]) - (dataPrice[0]);
  let lineColor="";
  if(priceDifference >= 0) {
    lineColor="green";
  } else {
    lineColor="red";
  }

  const chartData = {
    labels: [...dataLabel],
    datasets: [
      {
        label: `${props.stock}`.toUpperCase(),
        data: [...dataPrice],
        fill: false,
        backgroundColor: "rgba(0,50,5,0.5)",
        borderColor: `${lineColor}`
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
            {console.log("inside div", dataPrice)}  
            <Line id="portfolioChart" data={chartData} width={150} height={250} options={{maintainAspectRatio: false}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PortfolioDetail;
