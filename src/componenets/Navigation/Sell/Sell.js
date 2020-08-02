import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import Quote from "../../Quote/Quote";
import axios from "axios";
import styles from "./Sell.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Footer/Footer";
import Modal from "../../Modal/Modal";

const Sell = (props) => {
  const [data, setData] = useState([]);
  const [money, setMoney] = useState([]);
  const [displayMoney, setDisplayMoney] = useState(5000);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [receivedSymbol, setReceivedSymbol] = useState("");
  const [logModal, setLogModal] = useState(false);
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let fullDate = `${day}/${month + 1}/${year}`;

  useEffect(() => {
    let newData = [];
    axios
      .get(
        `https://wallstreet-bull.firebaseio.com/orders.json?auth=${props.token}`
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
        if (err.response.status === 401) {
          setLogModal(true);
        }
      });
    let myMoney = [];
    axios
      .get(
        `https://wallstreet-bull.firebaseio.com/money.json?auth=${props.token}`
      )
      .then((response) => {
        for (let key in response.data) {
          myMoney.push([...response.data[key]]);
        }
        if (response.data !== null) {
          myMoney = myMoney.splice(-1).pop();
          setMoney(...money, myMoney);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    let myHistory = [];
    axios
      .get(
        `https://wallstreet-bull.firebaseio.com/history.json?auth=${props.token}`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sellShares = (symbol) => {
    console.log(symbol, "SellShares");
    let updatedData = data.filter(
      (company) => company.symbol !== symbol || company.userId !== props.userId
    );
    setData(updatedData);
    let resData;
    for (const item of data) {
      if (item.symbol === symbol && item.userId === props.userId) {
        resData = {
          shares: item.shares,
          buyOrSell: true,
          companyName: item.companyName,
          symbol: item.symbol,
          price: item.price,
          userId: props.userId,
          date: fullDate,
        };
      }
    }
    setHistory([...history, resData]);
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`
      )
      .then((response) => {
        let myMoney;
        for (let item of data) {
          if (item.symbol === symbol && item.userId === props.userId) {
            let calc = displayMoney + item.shares * response.data.latestPrice;
            myMoney = {
              money: calc,
              userId: props.userId,
            };
          }
        }
        setMoney([...money, myMoney]);
        hideModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post(
        `https://wallstreet-bull.firebaseio.com/history.json?auth=${props.token}`,
        history
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setLoading(false);
    }
    if (money !== null) {
      axios
        .post(
          `https://wallstreet-bull.firebaseio.com/money.json?auth=${props.token}`,
          money
        )
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
      .post(
        `https://wallstreet-bull.firebaseio.com/orders.json?auth=${props.token}`,
        data
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const modalHandler = (symbol) => {
    setReceivedSymbol(symbol);
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  let modalConfirm = (
    <div>
      <Modal status={modal} clicked={hideModal}>
        <h4>Are you sure?</h4>
        <button className="btn btn-warning" onClick={hideModal}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => sellShares(receivedSymbol)}
        >
          Yes
        </button>
      </Modal>
    </div>
  );

  return (
    <div>
      <Modal status={logModal}>
        <h4>Please Log in to continue</h4>
        <Link className="btn btn-success" to="/">
          OK
        </Link>
      </Modal>
      <div className={styles.Money}>
        <h4>My Money</h4>
        {loading ? <Spinner /> : <h1>${displayMoney.toFixed(2)}</h1>}
      </div>
      <hr />
      <div className={styles.Flex}>
        <div className={styles.ChildOne}>
          <h2>My Wallet</h2>
          <p className={styles.Info}>
            Check what's the price NOW before selling shares!
          </p>
          {modalConfirm}
          <ul className={styles.Card}>
            {data
              ? // eslint-disable-next-line array-callback-return
                data.map((item, index) => {
                  if (item.userId === props.userId) {
                    return (
                      <li key={index} className={styles.Li}>
                        <p className={styles.Shares}>{item.shares}</p>
                        <h5>{item.companyName}</h5>
                        <p className={styles.Symbol}>({item.symbol})</p>
                        <hr />
                        <p style={{ fontSize: "15px" }}>
                          Purchased for: <span>${item.price}</span>
                        </p>
                        <button
                          onClick={() => modalHandler(item.symbol)}
                          className="btn btn-danger btn-lg btn-block"
                        >
                          SELL
                        </button>
                      </li>
                    );
                  }
                })
              : null}
          </ul>
        </div>
        <div className={styles.Child}>
          <Quote />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sell;
