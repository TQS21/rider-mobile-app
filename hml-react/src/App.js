import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
// import axios from 'axios';

import Login from './components/Login';
import DeliveriesList from './components/DeliveriesList';
import Specification from './components/Specification';
import Register from './components/Register';
import WorkingDelivery from './components/WorkingDelivery';


import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentJob: null,
      deliveries: []
    };
    this.routerRef = React.createRef();
  }

  /* async componentDidMount() {

    // const deliveries = await axios.get('http://localhost:8080/delivery');

    let deliveries = {status: 200, data : 	      
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

    if(deliveries.status === 200) {
      console.log(deliveries.data)
      this.setState({ user:null,  deliveries: deliveries.data });
    } else {
      this.setState({ user:null,  deliveries: null });
    
    }

    this.setState({ user:null,  deliveries: deliveries.data });
    // console.log(this.state)
  } */

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
    // console.log(email)
    // console.log(password)
    let res = {data:{token: "sdsadas"}, status: 200}
    if(res.status === 200) {
      // console.log(res)
      console.log("token",res.data.token)
      this.setState({ user: res.data.token });


      let deliveries = {status: 200, data : 	      
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
              "name" : "brownies",
              "price": 25.0
            }
          },
          {
            "id": 2,
            "timestamp": 1653572525,
            "delivery_timestamp": 1653572533,
            "courier": {
              "user": {
                "id": 2,
                "email": "viscente@sapo.pt"
              },
              "name": "manel",
              "photo": "https://www.n-tv.pt/files/2022/01/jorge-2.jpg",
              "birthdate": "2022-05-20T09:12:33.001Z"
            },
            "Shop": {
              "id": 2,
              "name": "Continente  (ㆆ_ㆆ) ",
              "user": {
                "id": 1,
                "email": "laura@sapo.pt"
              },
              "address": {
                "latitude": 102.2,
                "longitude": -32.2
              }
            },
            "status": {
              "id": 2,
              "name": "Queued"
            },
            "contact": {
              "name": "João Felix",
              "phone_number": "963456432"
            },
            "address": {
              "latitude": 103.2,
              "longitude": -33.2
            },
            "product":{
              "name" : "brownies (>‿◠)✌",
              "price": 23.0
            }
          }
        ]
        }
  
      if(deliveries.status === 200) {

        console.log( "deliveries", deliveries.data)
        this.setState({  deliveries: deliveries.data });
      } else {
        this.setState({  deliveries: null });
      
      }
  
      // console.log(this.state)

      return true;


    } else {
      return false;
    }
    
  }


  register = async (photo, birthdate, email, password) => {
    return true;
    // const res = await axios.post(
    //   'http://localhost:8081/hml/api/register',
    //   { name, email, password },
    // ).catch((res) => {
    //   return { status: 401, message: 'Unauthorized' }
    // })
    // console.log(res.status)
    // if(res.status === 202) {
    //   const user = {
    //     email:res.data.email,
    //     name:res.data.name,
    //     bought:[]
    //   }
    //   this.setState({ user });
    //   localStorage.setItem("user", JSON.stringify(user));
    //   return true;
    // } else {
    //   return false;
    // }
  }

  logout = e => {
    e.preventDefault();
    // let deliveries = localStorage.getItem("deliveries");
    // let delivery = localStorage.getItem("delivery");
    // this.setState({ user: null , deliveries, delivery });
    this.setState({ user: null  });
    this.setState({ deliveries: []  });
    this.routerRef.current.history.push("/login");
    
  };



  accept_delivery = delivery => {

    console.log("currentjob",delivery)
    let response = {status:200 , data:{}}
  
    if (response.status === 200){
  
        console.log("_Delivery accepted!!!!");
        // this.setState({ delivery: delivery});
        // this.routerRef.current.history.push("/delivery");
        this.setState({ currentJob: delivery});
        this.routerRef.current.history.push("/delivery");
      
  
    }
    else if (response.status === 404){
      console.log("Delivery not Found");
    }
    else if (response.status === 401){
      console.log("Please Login first");
    }
    else if (response.status === 403){
      console.log("Permission error");
    }
    else{
      console.log("invalid parameters");
    }
  
    /* fetch('http://deti-tqs-05:8080/delivery'+id, {
        method: 'POST',
                header : new Headers({
            'token':  this.state.user, 
        }), 
      }).then((response)=>{
        if (response.ok){
          response.json().then((logins) => {
  
            console.log("Delivery accepted!!!!");
            this.setState({ delivery: delivery});
            this.routerRef.current.history.push("/delivery");
  
  
        })
        }
        else if (response.status === 404){
          console.log("Delivery not Found");
        }
        else if (response.status === 401){
          console.log("Please Login first");
        }
        else if (response.status === 403){
          console.log("Permission error");
        }
        else{
          console.log("invalid parameters");
        }
        
      })  */
  };

  done = currentJob => {
    console.log("current job",currentJob)
    this.setState({ currentJob: null  });
    console.log(this.state.currentJob)


/*     fetch('http://deti-tqs-05:8080/delivery'+currentJob.id, {
        method: 'DELETE',
        header : new Headers({
            'token':  this.state.user, 
        }), 
      }).then((response)=>{
        if (response.status === 202){
  
            console.log("Delivery completed with success!!!!");
            this.setState({ currentJob: null  });

            this.routerRef.current.history.push("/deliveries");
  
  
        }
        else if (response.status === 404){
          console.log("Delivery not Found");
        }
        else if (response.status === 401){
          console.log("Please Login first");
        }
        else if (response.status === 403){
          console.log("Permission error");
        }
        else{
          console.log("invalid parameters");
        }
        
      })  */


    this.routerRef.current.history.push("/deliveries");
  
  }


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
          checkout: this.checkout,
          accept_delivery: this.accept_delivery,
          done:  this.done,
          register:  this.register
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
              <Route exact path="/currentJob" component={WorkingDelivery} />
              
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
