
import './WatchList.css';
import React, { useState, useEffect } from 'react';
import HotStockDetail from './HotStockDetail';

const HotStocks = () => {
  const [hotties, setHotties] = useState([]);

  useEffect(() => {
    const url = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_797fccfaec704ed4909e8ac1156e1db9`;
    const stockFetch = async () => {
      const response = await fetch(url);
      const hotties = await response.json();
      await setHotties(hotties);
    }
    stockFetch();
    function refresh() {
      setInterval(stockFetch, 300000);
    }
    refresh();
  }, []);

  return (
    <div className="test">
      {hotties.map(mover => <HotStockDetail key={mover.highTime} props={mover} />)}
    </div>
  );
}

export default HotStocks;