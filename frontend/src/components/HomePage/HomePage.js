import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NewsPage from '../NewsPage/NewsPage';
import { Line, Pie, Doughnut } from "react-chartjs-2";
import HotStocks from '../WatchList/HotStocks';
import PortfolioList from '../WatchList/PortfolioList';
import * as sessionActions from "../../store/session";
import * as portfolioActions from "../../store/portfolio";
import { useDispatch, useSelector } from "react-redux";


function HomePage(isLoaded) {
  const sessionUser = useSelector(state => state.session.user);
  const [data, setData] = useState([]);
  const [shares, setShares] = useState(0);
  const [stockSymbol, setStockSymbol] = useState("spy");
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [portfolio, setPortfolio] = useState();

  const statePortfolio = useSelector(state => state.portfolio.portfolio);
  // console.log("statePortfolio", statePortfolio);
  let arrPortfolio = [];

  if (statePortfolio) {
    // let portfolioShares = 0;
    for (let i=0; i<statePortfolio.length; i++) {
      // portfolioShares = statePortfolio[i].shares;
      // eslint-disable-next-line no-loop-func
      const stockFetch = async () => {
        const response = await fetch(`https://cloud.iexapis.com/stable/stock/${statePortfolio[i].stockSymbol}/book?token=pk_28ed5007f5f944b4bb34a679e72f21fe&chartLast=1`);
        const quotes = await response.json();
        console.log("quotes", (statePortfolio[i].shares));
        statePortfolio[i].mktValue = (quotes.quote.latestPrice * statePortfolio[i].shares);
      };
      stockFetch();
    }
  }

  if (statePortfolio) {
    for (let i = 0; i < statePortfolio.length; i++) {
      arrPortfolio.push(statePortfolio[i]);
    }
  }

  console.log("arrPortfolio", arrPortfolio);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value) {
      setStockSymbol(e.target.value);
    } else {
      setStockSymbol("spy");
    }
  };

  const handleShares = (e) => {
    e.preventDefault();
    setShares(e.target.value);
  }

  const handleSearch = (e) => {
    let input = document.getElementById('search-field');
    setStockSymbol(input.value);
  }

  useEffect(() => {
    const queryPortfolio = async () => {
      let userPortfolio = {};
      const resTest = await fetch(`api/portfolio`);
      const quoteTest = await resTest.json();
      // console.table("quoteTest", quoteTest);
      for (let i = 0; i < quoteTest.length; i++) {
        let currentValue = quoteTest[i].stockSymbol;
        if (userPortfolio[currentValue] === undefined) {
          userPortfolio[currentValue] = quoteTest[i].shares;
        } else {
          userPortfolio[currentValue] += quoteTest[i].shares;
        }
      }
      setPortfolio(userPortfolio);
      dispatch(portfolioActions.getPortfolio(quoteTest));
    }
    queryPortfolio();
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserId(sessionUser.id);
    let userId = sessionUser.id;
    // console.log("userId", userId, "sessionUser", sessionUser.id);
    setErrors([]);
    setPortfolio(stockSymbol);
    window.location.reload();
    return dispatch(sessionActions.portfolioAdd({ stockSymbol, shares, userId }))
    .catch(res => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
  }


  // console.log("portfolio", portfolio);

  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/${stockSymbol}/intraday-prices?token=pk_28ed5007f5f944b4bb34a679e72f21fe&chartLast=400`;
    // console.log("stockSymbol", stockSymbol);
    window.onload = handleSearch();
    if(stockSymbol) {
      const stockFetch = async () => {
        const response = await fetch(url);
        const quotes = await response.json();
        setData(quotes);
      }
      stockFetch();
      function refresh() {
        setInterval(stockFetch, 300000);
      }
      refresh();
    }
  }, [stockSymbol]);

  let dataPrice = [];
  let dataLabel = [];
  // let dataVolume = [];
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

  const pieOptions = {
      legend: {
          display: false,
          labels: {
              fontColor: 'rgb(255, 99, 132)'
          },
      },
  }

  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,

    legend: {
      display: false
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

  const pieData = {
    labels: ["t", "aapl", "tsla", "fro", "spy"],
    datasets: [
      {
        label: "Portfolio",
        data: [57600, 270740, 250890, 14260, 39290],
        backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0,0,0.2)", "rgba(0,0,255,0.2)", "rgba(255,255,0,0.2)", "rgba(0,255,255,0.2)"],
      }
    ],
    borderWidth: "0.1px",
  }

  const chartData = {
    labels: [...dataLabel],
    datasets: [
      {
        label: `${stockSymbol}`.toUpperCase(),
        data: [...dataPrice],
        fill: false,
        backgroundColor: "rgba(0,50,5,0.5)",
        borderColor: `${lineColor}`,
        borderWidth: 0.75,
        radius: 0.5,
        hoverRadius: 4,
      }
    ]
  };

  // console.log("dataPrice", dataPrice);
  // console.log('homePortfolio', portfolio);

  let portfolioList;

  if (sessionUser) {
    portfolioList = (
      <PortfolioList portfolio={ portfolio }/>
    );
  } else {
    portfolioList = (
      <HotStocks />
    );
  }

  return (
    <div className="main-page-container">
      <div className="search-div">
          <button className="search-button" onClick={handleSearch}><img alt="magnifying glass" src="./images/magnify-glass.png" width="20" /></button>
          <input
          id="search-field"
          type="text"
          placeholder="Enter Stock Symbol(default SPY)"
          // defaultValue="SPY"
          // value={`${stockSymbol}`}
          onChange={handleChange}
          />
      </div>
      <div className="stockChart">

        {
          (!sessionUser || stockSymbol) ?
                        <div>
                          <span className="banner__container">
                          { (stockSymbol) ? <h1 className="graphName">{stockSymbol.toUpperCase()}</h1> : <h1 className="graphName">SPY</h1> }
                          <h1 className="graphName">${`${dataPrice[dataPrice.length - 1]}`}</h1>
                          </span>
                          <Line id="chart" data={chartData} options={chartOptions} />
                        </div>
            :
              <div><h1 className="graphName">PORTFOLIO</h1><Doughnut id="pie" data={pieData} options={pieOptions} /></div>
        }

        <div className="news-page-container">
          <NewsPage value={stockSymbol} />
        </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      <div className="watchlist-container">
      <div>
      { (sessionUser) ? <h1 className="portfolio-banner">Portfolio Detail</h1> : <h1 className="portfolio-banner">Hot Stocks</h1> }
        <form onSubmit={handleSubmit} id="portfolio-form">
          <label className="shares-input">Add
            <input
              type="text"
              id="shares-field"
              onChange={handleShares}
              placeholder="#"
              required
              />
               Shares of -{stockSymbol} to
          <button className="add-portfolio" type="submit">Portfolio</button>
          </label>
        </form>
      </div>
        {isLoaded && portfolioList}

      </div>
    </div>
  )
};

export default HomePage;
