import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Quote = () => {
  const [company, setCompany] = useState("");
  const [data, setData] = useState([]);
  const API = `https://cloud.iexapis.com/stable/stock/${company}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`;

  const checkPrice = (e) => {
    e.preventDefault();
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

  return (
    <div>
      <h2>Quote</h2>
      <form onSubmit={checkPrice}>
        <input
          onChange={(e) => setCompany(e.target.value)}
          type="text"
          placeholder="Symbol"
        />
        <button>Check Price</button>
      </form>
      <h3>
        {data.map((price) => {
          return price.latestPrice;
        })}
      </h3>
    </div>
  );
};

export default Quote;
