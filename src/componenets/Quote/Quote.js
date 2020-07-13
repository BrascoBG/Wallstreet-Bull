import React, { useState, useEffect } from "react";
import axios from "axios";

const Quote = () => {
  const [company, setCompany] = useState("");
  const [data, setData] = useState([]);
  const API = `https://cloud.iexapis.com/stable/stock/${company}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`;

  const checkPrice = () => {
    axios
      .get(API)
      .then((response) => {
        console.log(response);
        setData([...data, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1>Quote</h1>
      <input
        onChange={(e) => setCompany(e.target.value)}
        type="text"
        placeholder="Symbol"
      />
      <button onClick={checkPrice}>Check Price</button>
      <h3>
        {data.map((price) => {
          return price.latestPrice;
        })}
      </h3>
    </div>
  );
};

export default Quote;
