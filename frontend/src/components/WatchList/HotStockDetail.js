import React from 'react';
import './WatchList.css';

function HotStockDetail(props) {
  const movers = props.props;
  // console.log(movers.symbol);
  return (
    <h1>{movers.symbol}</h1>
  );
}

export default HotStockDetail;