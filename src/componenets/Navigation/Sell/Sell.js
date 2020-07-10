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
          newData.push({
            ...response.data[key],
          });
        }
        setData([...data, newData.splice(-1).pop()]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1>Sell componenet</h1>
      <button onClick={fetch}>Fetch</button>
    </div>
  );
};

export default Sell;
