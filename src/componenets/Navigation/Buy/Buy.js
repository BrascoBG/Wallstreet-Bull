import React, { useState, useEffect } from "react";
import Quote from "../../Quote/Quote";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";

const Buy = () => {
  const [myData, setMyData] = useState([]);
  const [company, setCompany] = useState("");
  const [shares, setShares] = useState("");
  const [money, setMoney] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let fullDate = `${day}/${month + 1}/${year}`;

  useEffect(() => {
    let fireData = [];
    axios
      .get("https://wallstreet-bull.firebaseio.com/orders.json")
      .then((response) => {
        for (let key in response.data) {
          fireData.push([...response.data[key]]);
        }
        if (response.data !== null) {
          fireData = fireData.splice(-1).pop();
          setMyData(...myData, fireData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    let myMoney = [];
    axios
      .get("https://wallstreet-bull.firebaseio.com/money.json")
      .then((response) => {
        for (let key in response.data) {
          myMoney.push(response.data[key]);
        }
        if (response.data !== null) {
          myMoney = myMoney.splice(-1).pop();
          setMoney(myMoney);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    let myHistory = [];
    axios
      .get("https://wallstreet-bull.firebaseio.com/history.json")
      .then((response) => {
        for (let key in response.data) {
          myHistory.push(response.data[key]);
        }
        if (response.data !== null) {
          myHistory = myHistory.splice(-1).pop();
          setHistory(...history, myHistory);
        }
        setLoading(false);
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
        console.log(response);
        let myMoney = money - shares * response.data.latestPrice;
        updateMyMoney(myMoney);
        const resData = {
          shares: parseInt(shares),
          symbol: company.toUpperCase(),
          companyName: response.data.companyName,
          price: response.data.latestPrice,
          buyOrSell: false,
          date: fullDate,
        };
        setHistory([...history, resData]);
        for (const item of myData) {
          if (item.symbol === resData.symbol) {
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
        setMyData([...myData, resData]);
        setCompany("");
        setShares("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateMyMoney = (myMoney) => {
    setMoney(myMoney);
    axios
      .post("https://wallstreet-bull.firebaseio.com/money.json", myMoney)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("History", history);
    if (company !== "") {
      axios
        .post("https://wallstreet-bull.firebaseio.com/history.json", history)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  useEffect(() => {
    console.log("My Data", myData);
    if (company !== "") {
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
      <h1>{loading ? <Spinner /> : `Your money ${money.toFixed(2)}`}</h1>
      <hr />
      <h3>Buy Stock</h3>
      <form onSubmit={fetchData}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Shares"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          required
        />
        <button>BUY</button>
      </form>
      <Quote />
    </div>
  );
};

export default Buy;
