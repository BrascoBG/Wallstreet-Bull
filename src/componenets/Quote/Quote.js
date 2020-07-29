import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Quote.module.css";
import Modal from "../Modal/Modal";

const Quote = (props) => {
  const [company, setCompany] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const API = `https://cloud.iexapis.com/stable/stock/${company}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`;

  const checkPrice = (e) => {
    e.preventDefault();
    axios
      .get(API)
      .then((response) => {
        console.log(response);
        setData([...data, response.data]);
        setCompany("");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data);
        setError(true);
      });
  };

  const errorHandler = () => {
    setError(false);
  };

  return (
    <div>
      <h2>Quote</h2>
      <p className={styles.Info}>Check the share price of any company</p>
      <form onSubmit={checkPrice}>
        <input
          onChange={(e) => setCompany(e.target.value)}
          type="text"
          placeholder="Company Symbol"
          required
          value={company}
        />
        <p className={styles.InfoP}>
          Symbol like: "aapl", "msft", "fb", etc...
        </p>
        <button className="btn btn-warning btn-lg btn-block">
          Check Price
        </button>
      </form>
      {errorMessage !== "" ? (
        <Modal status={error} clicked={errorHandler}>
          {errorMessage}
        </Modal>
      ) : null}
      {data.map((price, index) => (
        <h6 key={index} className="alert alert-warning" role="alert">
          {price.companyName} - ${price.latestPrice}
        </h6>
      ))}
    </div>
  );
};

export default Quote;
