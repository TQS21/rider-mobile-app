import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import Login from './components/Login';
import DeliveriesList from './components/DeliveriesList';
import Specification from './components/Specification';
import Register from './components/Register';


import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      // cart: {},
      deliveries: []
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {

    const deliveries = await axios.get('http://localhost:8080/delivery');

    let user =  null;

    this.setState({ user,  deliveries: deliveries.data });
  }

  login = async (email, password) => {
    this.setState({ user: "dsadsasada" });
    return true
    /* const res = await axios.post(
      'http://deti-tqs-05:8080/login',
      { email, password },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

    if(res.status === 200) {
      console.log(res)
      const user = {
        token: res.data.token
      }
      console.log(user)
      this.setState({ user });
      return true;
    } else {
      return false;
    } */
  }

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });

    
  };


  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          login: this.login,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
        <div className="App">
          <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 ">HML</b>
              <label
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
              <div className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
                {!this.state.user ? (
                  <>
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>

                  <Link to="/register" className="navbar-item">
                    Register
                  </Link>
                  </>
                ) : (
                  <>
                  <Link to="/deliveries" className="navbar-item">
                    Deliveries
                  </Link>

                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>
                  </>
                )}
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/specification" component={Specification} />
              <Route exact path="/deliveries" component={DeliveriesList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
