import React, { useState, useEffect } from 'react';
import './WatchList.css';
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";


function PortfolioDetail(props) {
  const [data, setData] = useState([]);
  const statePortfolio = useSelector(state => state.portfolio.portfolio);
  // console.log("statePortfolio", statePortfolio);
  // console.log('portfolioDetail', props.stock.stockSymbol, props.stock.mktValue);

  useEffect(() => {
    const stockFetch = async () => {
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${props.stock.stockSymbol}/intraday-prices?token=pk_28ed5007f5f944b4bb34a679e72f21fe&chartLast=40`);
      const quotes = await response.json();
      setData(quotes);
    }
    stockFetch();
  }, [props.stock]);

  let dataPrice = [];
  let dataLabel = [];

  data.forEach(quote => {
    // console.log("quote", quote.label);
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

  const options = {
    maintainAspectRatio: true,
    responsive: true,

    legend: {
      display: true
    },
    scales: {
      xAxes: [{
          ticks: {
              display: false //this will remove only the label
          }
      }],
      yAxes: [{
        ticks: {
            display: false //this will remove only the label
        }
    }]
    },

  }

  const chartData = {
    labels: [...dataLabel],
    datasets: [
      {
        label: `${props.stock.stockSymbol}`.toUpperCase(),
        data: [...dataPrice],
        fill: false,
        backgroundColor: "rgba(0,50,5,0.5)",
        borderColor: `${lineColor}`,
        borderWidth: 0.5,
        radius: 0.25,
        hoverRadius: 4,
      }
    ]
  };

  if (props.stock === 'undefined') {
    return ('');
  } else {
    return (
      <div className="portfolio-container">
        <div>
          <div className="stock-symbol-portfolio">
            <Line id="portfolioChart" data={chartData} options={options} />
            <p>price: ${dataPrice[`${dataPrice.length - 1}`]}</p>
            <p> total: <span>${props.stock.mktValue}</span></p>
          </div>
        </div>
      </div>
    )
  }
}

export default PortfolioDetail;
