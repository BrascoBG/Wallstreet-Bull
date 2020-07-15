import React, { useEffect, useState } from "react";
import axios from "axios";

const History = (props) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let myHistory = [];
    axios
      .get(
        "https://wallstreet-bull.firebaseio.com/history.json?auth=" +
          props.token
      )
      .then((response) => {
        for (let key in response.data) {
          myHistory.push([...response.data[key]]);
        }
        myHistory = myHistory.splice(-1).pop();
        console.log(myHistory);
        setHistory(myHistory);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>History componenet</h1>
      {history
        ? history.map((item, index) => (
            <ul key={index}>
              <li>
                {item.companyName} {item.price} ({item.shares}){" "}
                {item.buyOrSell ? "Sell" : "Purchased on: " + item.date}
              </li>
            </ul>
          ))
        : ""}
    </div>
  );
};

export default History;
