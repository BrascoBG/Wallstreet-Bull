import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";

const Sell = () => {
  const [data, setData] = useState([]);
  const [money, setMoney] = useState(null);

  useEffect(() => {
    let newData = [];
    axios
      .get("https://wallstreet-bull.firebaseio.com/orders.json")
      .then((response) => {
        console.log(response);
        for (let key in response.data) {
          newData.push([...response.data[key]]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
          myMoney.push(response.data[key]);
        }
        if (response.data !== null) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          myMoney = myMoney.splice(-1).pop();
        }
        setMoney(myMoney);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sellShares = (symbol) => {
    const updatedData = data.filter((company) => company.symbol !== symbol);
    if (updatedData.length === 0) {
      axios
        .delete("https://wallstreet-bull.firebaseio.com/orders.json")
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setData(updatedData);
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`
      )
      .then((response) => {
        console.log("sell response", response);
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
      .post("https://wallstreet-bull.firebaseio.com/money.json", money)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [money]);

  useEffect(() => {
    console.log(data);
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
    </div>
  );
};

export default Sell;
