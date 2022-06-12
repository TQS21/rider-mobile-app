import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
// import axios from 'axios';

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

    // const deliveries = await axios.get('http://localhost:8080/delivery');

    const deliveries = {status: 200, data : 	      
      [
        {
          "id": 1,
          "timestamp": 1653572525,
          "delivery_timestamp": 1653572533,
          "courier": {
            "user": {
              "id": 1,
              "email": "vasco@sapo.pt"
            },
            "name": "Jorge",
            "photo": "https://www.n-tv.pt/files/2022/01/jorge-2.jpg",
            "birthdate": "2022-05-20T09:12:33.001Z"
          },
          "Shop": {
            "id": 1,
            "name": "Pingo Doce  (ó﹏ò｡) ",
            "user": {
              "id": 1,
              "email": "vasco@sapo.pt"
            },
            "address": {
              "latitude": 100.2,
              "longitude": -3.2
            }
          },
          "status": {
            "id": 1,
            "name": "Queued"
          },
          "contact": {
            "name": "João Felix",
            "phone_number": "963456432"
          },
          "address": {
            "latitude": 100.2,
            "longitude": -3.2
          },
          "product":{
            "name" : "brownies ( ͡° ͜ʖ ͡°)",
            "price": 25.0
          }
        }
      ]
      }
    let user =  null;

    if(deliveries.status === 200) {
      console.log(deliveries.data)
      this.setState({ user,  deliveries: deliveries.data });
    } else {
      this.setState({ user:null,  deliveries: null });

    }

    this.setState({ user,  deliveries: deliveries.data });
  }

  login = async (email, password) => {
    // this.setState({ user: "dsadsasada" });
    // return true
    /* const res = await axios.post(
      'http://deti-tqs-05:8080/login',
      { email, password },
    ).catch((res) => {
      if(res.status === 200) {
        console.log(res)
        console.log(res.data.token)
        this.setState({ res.data.token });
        return true;
      } else {
        return false;
      }
      // return { status: 401, message: 'Unauthorized' }
    }) */
    console.log(email)
    console.log(password)
    const res = {data:{token: "sdsadas"}, status: 200}
    if(res.status === 200) {
      console.log(res)
      console.log(res.data.token)
      this.setState({ user: res.data.token });
      return true;
    } else {
      return false;
    }
    
  }

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    this.routerRef.current.history.push("/login");
    
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
                className="navbar-burger burger"
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
