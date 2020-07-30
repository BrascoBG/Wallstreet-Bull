import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./History.module.css";
import Footer from "../../Footer/Footer";

const History = (props) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let myHistory = [];
    let token = props.token;
    axios
      .get(`https://wallstreet-bull.firebaseio.com/history.json?auth=${token}`)
      .then((response) => {
        for (let key in response.data) {
          myHistory.push([...response.data[key]]);
        }
        myHistory = myHistory.splice(-1).pop();
        const filteredHistory = myHistory.filter(
          (company) => company.userId === props.userId
        );
        setHistory(filteredHistory);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <main className={styles.Main}>
        <h1>Your Trading History</h1>
        <table className="table table-bordered">
          <tbody>
            <tr style={{ backgroundColor: "#ffffff66" }}>
              <th>Company</th>
              <th>Symbol</th>
              <th>Shares</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
            {history
              ? // eslint-disable-next-line array-callback-return
                history.map((item, index) => {
                  if (item.userId === props.userId) {
                    return (
                      <tr
                        className={
                          item.buyOrSell ? "table-danger" : "table-success"
                        }
                        key={index}
                      >
                        <td>{item.companyName}</td>
                        <td>{item.symbol}</td>
                        <td>{item.shares}</td>
                        <td>{item.price}</td>
                        <td>
                          {item.buyOrSell
                            ? "Sold on: " + item.date
                            : "Purchased on: " + item.date}
                        </td>
                      </tr>
                    );
                  }
                })
              : ""}
          </tbody>
        </table>
      </main>
      <div className={styles.Foot}>
        <Footer />
      </div>
    </div>
  );
};

export default History;
