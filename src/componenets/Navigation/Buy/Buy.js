import React, { useState, useEffect } from "react";
import Quote from "../../Quote/Quote";
import axios from "axios";

const Buy = () => {
  const [myData, setMyData] = useState([]);
  const [company, setCompany] = useState("");
  const [shares, setShares] = useState("");
  const [money, setMoney] = useState(5000);

  useEffect(() => {
    let fireData = [];
    axios
      .get("https://wallstreet-bull.firebaseio.com/orders.json")
      .then((response) => {
        for (let key in response.data) {
          fireData.push([...response.data[key]]);
        }
        fireData = fireData.splice(-1).pop();
        setMyData(...myData, fireData);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (e) => {
    e.preventDefault();
    const API = `https://cloud.iexapis.com/stable/stock/${company}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`;
    axios
      .get(API)
      .then((response) => {
        const resData = {
          shares: parseInt(shares),
          symbol: company.toUpperCase(),
          companyName: response.data.companyName,
          price: response.data.latestPrice,
        };
        for (const item of myData) {
          if (item.symbol === resData.symbol) {
            setMoney(money - resData.shares * resData.price);
            item.shares += +shares;
            axios
              .post(
                "https://wallstreet-bull.firebaseio.com/orders.json",
                myData
              )
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
            setCompany("");
            setShares("");
            return;
          }
        }
        setMoney(money - resData.shares * resData.price);
        setMyData([...myData, resData]);
        setCompany("");
        setShares("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(myData);

    if (company !== "") {
      console.log("company");
      axios
        .post("https://wallstreet-bull.firebaseio.com/orders.json", myData)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData]);

  return (
    <div>
      <h1>Your money {money}</h1>
      <hr />
      <h3>Buy Stock</h3>
      <form onSubmit={fetchData}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="number"
          placeholder="Shares"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
        />
        <button>BUY</button>
      </form>
      <Quote />
    </div>
  );
};

export default Buy;
