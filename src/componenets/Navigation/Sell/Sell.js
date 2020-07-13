import React, { useEffect, useState } from "react";
import axios from "axios";

const Sell = () => {
  const [data, setData] = useState([]);
  let newData = [];

  useEffect(() => {
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
  }, []);

  const sellShares = (companyName) => {
    const updatedData = data.filter(
      (company) => company.companyName !== companyName
    );
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
  };

  useEffect(() => {
    console.log(data);
    if (data.length > 5) {
      console.log("Null");
    }
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
      {data.map((item) => (
        <ul key={item.symbol}>
          <li>
            {item.companyName} - ({item.shares})
            <button onClick={() => sellShares(item.companyName)}>Sell</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Sell;
