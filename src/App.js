import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Home, Login, SignUp } from "./containers";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
