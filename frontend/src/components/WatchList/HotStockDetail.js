import React, { useState, useEffect } from 'react';
import './WatchList.css';
import { Line } from "react-chartjs-2";

function HotStockDetail(props) {
  const [data, setData] = useState([]);
  console.log('portfolioDetail', props.props);

  useEffect(() => {
    const stockFetch = async () => {
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${props.props}/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=40`);
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
        label: `${props.props}`.toUpperCase(),
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
            <p>${dataPrice[`${ dataPrice.length -1 }`]}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default HotStockDetail;


      {/* <img className="green-arrow" src="./images/up-green-arrow.png" width="30px" alt="up-arrow" /> */}

          {/* <span className="price-change">{movers.change}</span> */}
        {/* {movers.companyName} */}
      {/* <div className="overlay">
        <div className="companyName">{movers}</div>
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
      </div> */}
