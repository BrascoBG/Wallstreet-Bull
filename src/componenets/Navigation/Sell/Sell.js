/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import Quote from "../../Quote/Quote";
import axios from "axios";

const Sell = (props) => {
  const [data, setData] = useState([]);
  const [money, setMoney] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let newData = [];
    axios
      .get(
        "https://wallstreet-bull.firebaseio.com/orders.json?auth=" + props.token
      )
      .then((response) => {
        console.log(response);
        for (let key in response.data) {
          newData.push([...response.data[key]]);
        }
        newData = newData.splice(-1).pop();
        setData(...data, newData);
      })
      .catch((err) => {
        console.log(err);
      });
    let myMoney = [];
    axios
      .get(
        "https://wallstreet-bull.firebaseio.com/money.json?auth=" + props.token
      )
      .then((response) => {
        for (let key in response.data) {
          myMoney.push(response.data[key]);
        }
        if (response.data !== null) {
          myMoney = myMoney.splice(-1).pop();
        }
        setMoney(myMoney);
      })
      .catch((err) => {
        console.log(err);
      });
    let myHistory = [];
    axios
      .get(
        "https://wallstreet-bull.firebaseio.com/history.json?auth=" +
          props.token
      )
      .then((response) => {
        for (let key in response.data) {
          myHistory.push(response.data[key]);
        }
        if (response.data !== null) {
          myHistory = myHistory.splice(-1).pop();
          setHistory(...history, myHistory);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sellShares = (symbol) => {
    const updatedData = data.filter((company) => company.symbol !== symbol);
    if (updatedData.length === 0) {
      axios
        .delete(
          "https://wallstreet-bull.firebaseio.com/orders.json?auth=" +
            props.token
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setData(updatedData);
    let resData;
    for (const item of history) {
      if (item.symbol === symbol) {
        setHistory([
          ...history,
          (resData = {
            shares: item.shares,
            buyOrSell: true,
            companyName: item.companyName,
            symbol: item.symbol,
            price: item.price,
            userId: props.userId,
          }),
        ]);
      }
    }
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`
      )
      .then((response) => {
        for (let item of data) {
          if (item.symbol === symbol) {
            setMoney(money + response.data.latestPrice * item.shares);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post(
        "https://wallstreet-bull.firebaseio.com/history.json?auth=" +
          props.token,
        history
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  useEffect(() => {
    if (money !== null) {
      axios
        .post(
          "https://wallstreet-bull.firebaseio.com/money.json?auth=" +
            props.token,
          money
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [money]);

  useEffect(() => {
    axios
      .post(
        "https://wallstreet-bull.firebaseio.com/orders.json?auth=" +
          props.token,
        data
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  return (
    <div>
      <h1>Sell componenet</h1>

      {money ? <h1>Your money {money.toFixed(2)}</h1> : <Spinner />}
      {data
        ? data.map((item) => (
            <ul key={item.symbol}>
              <li>
                {item.companyName} - ({item.shares})
                <button onClick={() => sellShares(item.symbol)}>Sell</button>
              </li>
            </ul>
          ))
        : null}
      <Quote />
    </div>
  );
};

export default Sell;
