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
  const [money, setMoney] = useState(null);
  const [displayMoney, setDisplayMoney] = useState(5000);
  const [history, setHistory] = useState(null);
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
        `https://wallstreet-bull.firebaseio.com/orders/${props.userId}.json?auth=${props.token}`
      )
      .then((response) => {
        for (let key in response.data) {
          newData.push(response.data[key]);
        }
        setData(newData);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setLogModal(true);
        }
      });
    let myMoney;
    axios
      .get(
        `https://wallstreet-bull.firebaseio.com/money/${props.userId}.json?auth=${props.token}`
      )
      .then((response) => {
        myMoney = response.data;
        if (myMoney) {
          setDisplayMoney(myMoney.money);
        }
        setLoading(false);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sellShares = (symbol) => {
    let updatedData = data.filter(
      (company) => company.symbol !== symbol || company.userId !== props.userId
    );
    setData(updatedData);
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_583772a9158d43bd9e8f55df5c33a5b3`
      )
      .then((response) => {
        let myMoney;
        let resData;
        for (let item of data) {
          if (item.symbol === symbol && item.userId === props.userId) {
            let calc = displayMoney + item.shares * response.data.latestPrice;
            myMoney = {
              money: calc,
              userId: props.userId,
            };
            resData = {
              shares: item.shares,
              buyOrSell: true,
              companyName: item.companyName,
              symbol: item.symbol,
              price: response.data.latestPrice,
              userId: props.userId,
              date: fullDate,
            };
          }
        }
        deleteData(symbol);
        setMoney(myMoney);
        setDisplayMoney(myMoney.money);
        setHistory(resData);
        hideModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteData = (symbol) => {
    const lowerCaseSymbol = symbol.toLowerCase();
    axios
      .delete(
        `https://wallstreet-bull.firebaseio.com/orders/${props.userId}/${lowerCaseSymbol}.json?auth=${props.token}`
      )
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post(
        `https://wallstreet-bull.firebaseio.com/history/${props.userId}.json?auth=${props.token}`,
        history
      )
      .then((response) => {})
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect(() => {
    if (money !== null) {
      axios
        .put(
          `https://wallstreet-bull.firebaseio.com/money/${props.userId}.json?auth=${props.token}`,
          money
        )
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [money]);

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
