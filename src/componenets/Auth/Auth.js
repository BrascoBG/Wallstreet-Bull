import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styles from "./Auth.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUpSwitch, setSignInUpSwitch] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        console.log(response);
        setSignInUpSwitch(false);
        setToken(response.data.idToken);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const signeInRegisterHandler = () => {
    setSignInUpSwitch(!signInUpSwitch);
  };

  useEffect(() => {
    props.call(isLoggedIn);
    if (token !== null) {
      setLoggedIn(false);
      props.call(isLoggedIn, token);
    }
  }, [props, isLoggedIn, token]);

  return (
    <div>
      <div className={styles.Auth}>
        <form className={styles.Form} onSubmit={authenticateHandler}>
          <h2>{signInUpSwitch ? "Register a new account" : "Sign In"}</h2>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button>{signInUpSwitch ? "REGISTER" : "SIGN IN"}</button>
          {!isLoggedIn ? <Redirect to="/buy" /> : null}
        </form>
        <button onClick={signeInRegisterHandler}>
          {signInUpSwitch ? "I have an account" : "Register"}
        </button>
        {isLoading ? <Spinner /> : ""}
      </div>
    </div>
  );
};

export default Auth;
