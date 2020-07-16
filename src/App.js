import React, { useState } from "react";
import Auth from "./componenets/Auth/Auth";
import Header from "./componenets/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Buy from "./componenets/Navigation/Buy/Buy";
import Sell from "./componenets/Navigation/Sell/Sell";
import Wallet from "./componenets/Navigation/Wallet/Wallet";
import History from "./componenets/Navigation/History/History";
import About from "./componenets/Navigation/About/About";

function App() {
  const [signedIn, setSignedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const callBackFromAuth = (bool, token, id) => {
    setSignedIn(bool);
    setToken(token);
    setUserId(id);
  };

  return (
    <BrowserRouter>
      <div>
        {!signedIn ? <Header signed={signedIn} /> : null}
        <Switch>
          <Route
            path="/buy"
            render={() => <Buy userId={userId} token={token} />}
          />
          <Route
            path="/sell"
            render={() => <Sell userId={userId} token={token} />}
          />
          <Route path="/wallet" component={Wallet} />
          <Route
            path="/history"
            render={() => <History userId={userId} token={token} />}
          />
          <Route path="/about" component={About} />
          <Route path="/" render={() => <Auth call={callBackFromAuth} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
