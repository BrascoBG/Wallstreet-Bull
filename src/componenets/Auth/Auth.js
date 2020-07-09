import React, { useState } from "react";
import styles from "./Auth.module.css";
import axios from "axios";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin, setSignin] = useState(true);

  const authenticateHandler = (e) => {
    e.preventDefault();
    console.log(props.isSignedIn);
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfv0LuCGIL11aJ6krs-AVwdjim9Cz5jfQ";
    if (!signin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfv0LuCGIL11aJ6krs-AVwdjim9Cz5jfQ";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        setSignin(false);
      })
      .catch((err) => {
        console.log(err);
        setSignin(false);
      });
  };

  return (
    <div>
      <div className={styles.Auth}>
        <form className={styles.Form} onSubmit={authenticateHandler}>
          <h2>{signin ? "Register" : "Sign In"}</h2>
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
          <button>{signin ? "REGISTER" : "SIGN IN"}</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
