import React, { useState } from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import Bull from "../../assets/bull.png";
import Backdrop from "../Backdrop/Backdrop";

const Header = (props) => {
  const [navbar, setNavbar] = useState(false);

  const navBurger = () => {
    setNavbar(() => setNavbar(!navbar));
  };

  return (
    <div className={styles.Nav}>
      <Backdrop show={navbar} clicked={navBurger} />
      <div className={styles.Position}>
        <div onClick={navBurger} className={styles.Hamburger}>
          <div className={styles.Lines}></div>
          <div className={styles.Lines}></div>
          <div className={styles.Lines}></div>
        </div>
      </div>
      <img className={styles.Logo} alt="Logo" src={Bull} />
      <ul className={navbar ? styles.UlOpen : styles.Ul}>
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
