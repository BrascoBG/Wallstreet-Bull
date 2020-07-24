import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import Bull from "../../assets/bull.png";

const Header = (props) => {
  return (
    <div>
      <img className={styles.Logo} alt="Logo" src={Bull} />
      <ul className={styles.Ul}>
        <li className={styles.Li}>
          <NavLink activeClassName={styles.active} to="/buy">
            Buy Stocks
          </NavLink>
        </li>
        <li className={styles.Li}>
          <NavLink activeClassName={styles.active} to="/sell">
            Sell Stocks
          </NavLink>
        </li>
        <li className={styles.Li}>
          <NavLink activeClassName={styles.active} to="/wallet">
            Wallet
          </NavLink>
        </li>
        <li className={styles.Li}>
          <NavLink activeClassName={styles.active} to="/history">
            History
          </NavLink>
        </li>
        <li className={styles.Li}>
          <NavLink activeClassName={styles.active} to="/about">
            About
          </NavLink>
        </li>
        <li className={styles.Li}>
          <NavLink exact activeClassName={styles.active} to="/">
            {props.signed ? "Authenticate" : "Log Out"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
