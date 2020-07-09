import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h4 className={styles.Logo}>LOGO</h4>
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
          <NavLink activeClassName={styles.active} to="/quote">
            Quote
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
            Authenticate
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
