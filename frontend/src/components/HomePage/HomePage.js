import React, { useState } from 'react';
import './HomePage.css';

const url = "https://cloud.iexapis.com/stable/stock/FRO/intraday-prices?token=pk_797fccfaec704ed4909e8ac1156e1db9&chartLast=20";
async function testFetch(url) {
  const response = await fetch(url);
  const quotes = await response.json();
  return quotes;
}

let quotes = testFetch(url);
console.log(quotes);

function HomePage() {
  return (
    <h1 className="hello">HELLO</h1>
  )
};

export default HomePage;