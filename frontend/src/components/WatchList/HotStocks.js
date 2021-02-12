
import './WatchList.css';
import React, { useState, useEffect } from 'react';
import HotStockDetail from './HotStockDetail';

const HotStocks = () => {
  const [hotties, setHotties] = useState([]);

  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_797fccfaec704ed4909e8ac1156e1db9`;
    const stockFetch = async () => {
      const response = await fetch(url);
      const fatties = await response.json();
      console.log("fatties", fatties);
      for (let i=0; i<fatties.length; i++) {
        console.log("hotties-loop", fatties[i].symbol);
        if (hotties.includes(fatties[i].symbol)) {
          continue;
        } else {
          hotties.push(fatties[i].symbol);
        }
      }
      console.log("hotties", hotties);
      setHotties(hotties);
    }
    stockFetch();
    // function refresh() {
    //   setInterval(stockFetch, 300000);
    // }
    // refresh();
  }, []);

  return (
    <div className="test">
      {hotties.map((stock, idx) => <HotStockDetail key={idx} props={stock} />)}
    </div>
  );
}

export default HotStocks;
