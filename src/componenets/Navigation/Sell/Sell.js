import React, { useEffect, useState } from "react";
import axios from "axios";

const Sell = () => {
  const [data, setData] = useState([]);
  let newData = [];

  const fetch = () => {
    axios
      .get("https://wallstreet-bull.firebaseio.com/orders.json")
      .then((response) => {
        for (let key in response.data) {
          newData.push([...response.data[key]]);
        }
        newData = newData.splice(-1).pop();
        setData(...data, newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://wallstreet-bull.firebaseio.com/orders.json")
      .then((response) => {
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
    console.log(data);
  }, []);

  return (
    <div>
      <h1>Sell componenet</h1>
      <button onClick={fetch}>Fetch</button>
      {data.map((item) => (
        <ul key={item.symbol}>
          <li>
            {item.companyName} - ({item.shares})<button>Sell</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Sell;
