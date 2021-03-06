import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styles from "./Auth.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Bull from "../../assets/bull.png";
import Footer from "../Footer/Footer";
import aapl from "../../assets/aapl.png";
import msft from "../../assets/msft.png";
import fb from "../../assets/fb.png";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUpSwitch, setSignInUpSwitch] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const authenticateHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfv0LuCGIL11aJ6krs-AVwdjim9Cz5jfQ";
    if (!signInUpSwitch) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfv0LuCGIL11aJ6krs-AVwdjim9Cz5jfQ";
    }
    axios
      .post(url, authData)
      .then((response) => {
        setSignInUpSwitch(false);
        setToken(response.data.idToken);
        setUserId(response.data.localId);
        setIsLoading(false);
        setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
        errorMessage(error.response.data.error.message);
        setIsLoading(false);
      });
  };

  const signeInRegisterHandler = () => {
    setSignInUpSwitch(!signInUpSwitch);
  };

  useEffect(() => {
    props.call(isLoggedIn);
    if (token !== null) {
      props.call(isLoggedIn, token, userId);
    }
  }, [props, isLoggedIn, token, userId]);

  const errorMessage = (message) => {
    let myMessage = message;
    if (
      message === "WEAK_PASSWORD : Password should be at least 6 characters"
    ) {
      myMessage = "WEAK PASSWORD : Password should be at least 6 characters ";
    } else if (message === "EMAIL_EXISTS") {
      myMessage = "Email already exist!";
    } else if (message === "INVALID_PASSWORD") {
      myMessage = "Invalid Password!";
    } else if (message === "EMAIL_NOT_FOUND") {
      myMessage = "Email Not Found!";
    }
    setError(myMessage);
  };

  return (
    <div>
      <div className={styles.Auth}>
        <h1 className={styles.AuthTitle}>Wall Street Bull</h1>
        <div className={styles.Logo}>
          <img style={{ width: "200px" }} src={Bull} alt="Bull" />
        </div>
        <h1 className={styles.AuthH1}>Stock Exchange Trading Application</h1>
        <h2>
          An application where you can trade shares of the most famous
          international companies like{" "}
          <img width="45px" src={aapl} alt="apple" />{" "}
          <img width="60px" src={msft} alt="microsoft" />{" "}
          <img width="50px" src={fb} alt="facebook" />, etc...
        </h2>
        <div className={styles.Flex}>
          <div className={styles.SignSwitch}>
            <h3>Register and become a Wall Street Bull</h3>
            <hr />
            <h3>
              If you you are a Wall Street Bull already click the button below
              to SIGN IN
            </h3>
            <button
              type="button"
              className="btn btn-warning"
              onClick={signeInRegisterHandler}
            >
              {signInUpSwitch
                ? "I have an account already"
                : "Register New Account"}
            </button>
          </div>
          <form className={styles.SignSwitch} onSubmit={authenticateHandler}>
            <div className={styles.Form}>
              <h2>{signInUpSwitch ? "Register a new account" : "Sign In"}</h2>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                className={styles.SignInput}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button type="submit" className="btn btn-success">
                {signInUpSwitch ? "REGISTER" : "SIGN IN"}
              </button>
              <div> {isLoading ? <Spinner /> : ""}</div>
            </div>

            {isLoading ? (
              ""
            ) : (
              <p
                style={{
                  color: "#d43131",
                  padding: "10px",
                  marginTop: "5px",
                  textShadow: "1px 1px 1px black",
                }}
                role="alert"
              >
                {error}
              </p>
            )}
            {!isLoggedIn ? <Redirect to="/buy" /> : null}
          </form>
        </div>
        <div className={styles.Flex}>
          <div className={styles.Cards}>
            <h4>
              You start with{" "}
              <span style={{ fontWeight: "bold", fontSize: "30px" }}>
                $5000
              </span>
            </h4>
          </div>
          <div className={styles.Cards}>
            <h4>Trade with shares of the biggest international companies</h4>
          </div>
          <div className={styles.Cards}>
            <h4>
              Dive into the Wall Street atmosphere and become a successfull
              stock trader
            </h4>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default Auth;
