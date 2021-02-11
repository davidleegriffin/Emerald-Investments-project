import React, {useState} from 'react';
import PortfolioDetail from './PortfolioDetail';
import { useSelector } from "react-redux";
import './WatchList.css';


const PortfolioList = (props) => {
  // const [portfolio, setPortfolio] = useState();
  const portfolio = useSelector(action => action.payload);
  let arrPortfolio = [];
  const stocks = (props.portfolio);
  console.log("props", (props));
  for (let sym in stocks) {
    // console.log("sym", sym);
    arrPortfolio.push(sym);
  }
  console.log("arrPortfolio", portfolio);

    return (
      <div className="mover-container">
        <div>{arrPortfolio.map((stock,idx) => <PortfolioDetail key={idx} stock={stock} />)}</div>
      </div>
    );
};

export default PortfolioList;
