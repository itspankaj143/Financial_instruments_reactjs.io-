import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Footer from "./Footer";

function App() {
  const [value, setValue] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState(null);

  const fetchInstruments = async () => {
    const response = await fetch("sampleData (1).json");
    const data = await response.json();
    // console.log(data);
    setValue(data);
  };

  useEffect(() => {
    fetchInstruments();
  }, []);
  // console.log(value);

  useEffect(() => {
    if (sortKey === null) {
      setSortedData([...value]);
      // console.log(sortedData);
      console.log(...value);
    } else {
      const sorted = [...value];
      // console.log(sorted);

      // using sort method to sort it
      sorted.sort((a, b) => {
        if (sortKey === "ticker") {
          return a[sortKey].localeCompare(b[sortKey]);
        } else if (sortKey === "price") {
          return b[sortKey] - a[sortKey];
        } else if (sortKey === "assetClass") {
          const assetOrder = { Equities: 0, Macro: 1, Credit: 2 };

          return assetOrder[a[sortKey]] - assetOrder[b[sortKey]];
        }
        return 0;
      });
      setSortedData(sorted);
    }
  }, [sortKey, value]);

  return (
    <div className="App">
      <h1>Financial Instruments (Felix It's)</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortKey("ticker")}>Ticker</th>
            <th onClick={() => setSortKey("price")}>Price</th>
            <th onClick={() => setSortKey("assetClass")}>Asset Class</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((cval) => (
            <tr key={cval.ticker} className={cval.assetClass.toLowerCase()}>
              <td>{cval.ticker}</td>
              <td className={cval.price < 0 ? "negative" : ""}>
                {cval.price.toFixed(2)}
              </td>
              <td>{cval.assetClass}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default App;
