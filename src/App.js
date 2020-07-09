import React from "react";
import Auth from "./componenets/Auth/Auth";
import Header from "./componenets/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Buy from "./componenets/Navigation/Buy/Buy";
import Sell from "./componenets/Navigation/Sell/Sell";
import Quote from "./componenets/Navigation/Quote/Quote";
import History from "./componenets/Navigation/History/History";
import About from "./componenets/Navigation/About/About";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/buy" component={Buy} />
          <Route path="/sell" component={Sell} />
          <Route path="/quote" component={Quote} />
          <Route path="/history" component={History} />
          <Route path="/about" component={About} />
          <Route path="/" component={Auth} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
