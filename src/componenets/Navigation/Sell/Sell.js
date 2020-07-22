import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import Quote from "../../Quote/Quote";
import axios from "axios";

const Sell = (props) => {
  const [data, setData] = useState([]);
  const [money, setMoney] = useState([]);
  const [displayMoney, setDisplayMoney] = useState(5000);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let newData = [];
    axios
      .get("https://wallstreet-bull.firebaseio.com/orders.json")
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
      .get("https://wallstreet-bull.firebaseio.com/money.json")
      .then((response) => {
        for (let key in response.data) {
          myMoney.push([...response.data[key]]);
        }
        if (response.data !== null) {
          myMoney = myMoney.splice(-1).pop();
          setMoney(...money, myMoney);
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
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sellShares = (symbol) => {
    let updatedData = data.filter(
      (company) => company.symbol !== symbol || company.userId !== props.userId
    );
    setData(updatedData);
    // eslint-disable-next-line no-unused-vars
    let resData;
    for (const item of data) {
      if (item.symbol === symbol) {
        setHistory([
          ...history,
          (resData = {
            shares: item.shares,
            buyOrSell: true,
            companyName: item.companyName,
            symbol: item.symbol,
            price: item.price,
            userId: item.userId,
          }),
        ]);
      }
    }
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`
      )
      .then((response) => {
        let myMoney;
        for (let item of data) {
          if (item.symbol === symbol || item.userId === props.userId) {
            let calc = displayMoney + item.shares * response.data.latestPrice;
            myMoney = {
              money: calc,
              userId: props.userId,
            };
          }
        }
        setMoney([...money, myMoney]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post("https://wallstreet-bull.firebaseio.com/history.json", history)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  useEffect(() => {
    let updatedMoney;
    for (const item of money) {
      if (item.userId === props.userId) {
        updatedMoney = item.money;
      }
    }
    if (updatedMoney !== undefined) {
      setDisplayMoney(updatedMoney);
    }
    if (money !== null) {
      axios
        .post("https://wallstreet-bull.firebaseio.com/money.json", money)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [money]);

  useEffect(() => {
    axios
      .post("https://wallstreet-bull.firebaseio.com/orders.json", data)
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

      {loading ? <Spinner /> : <h1>Your money {displayMoney.toFixed(2)}</h1>}
      {data
        ? // eslint-disable-next-line array-callback-return
          data.map((item) => {
            if (item.userId === props.userId) {
              return (
                <ul key={item.symbol}>
                  <li>
                    {item.companyName} - ({item.shares})
                    <button onClick={() => sellShares(item.symbol)}>
                      Sell
                    </button>
                  </li>
                </ul>
              );
            }
          })
        : null}
      <Quote />
    </div>
  );
};

export default Sell;
