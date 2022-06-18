import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import Login from './components/Login';
import DeliveriesList from './components/DeliveriesList';
import Specification from './components/Specification';
import Register from './components/Register';
import WorkingDelivery from './components/WorkingDelivery';
import GeoLocation from './components/GeoLocation';
// import { useGeolocated } from "react-geolocated";


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
  // componentDidMount() {
  //   GeoLocation = () => {
  //     const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  //         useGeolocated({
  //             positionOptions: {
  //                 enableHighAccuracy: false,
  //             },
  //             userDecisionTimeout: 5000,
  //         });}
  //   }

    
  showPosition = (pos) => {
      localStorage.setItem("latitude", pos.coords.latitude)
      localStorage.setItem("longitude", pos.coords.longitude)
  }
    
  login = async (email, password) => {
    // let geolocation = GeoLocation
    console.log(email,password)
    const login = await axios.post('http://localhost:9090/auth/login', {email, password}).catch((login)=>
    {return {status: 401, message: "User not Found"}})

    console.log("token",login)
    if(login.status === 200) {
      let token = login.data.token
      this.setState({ user: token });
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.showPosition);
        let latitude= localStorage.getItem("latitude")
        let longitude= localStorage.getItem("longitude")
        
        console.log("latitude",latitude)
        console.log("longitude",longitude)

        // const delivs = await axios.get('http://localhost:9090/delivery/nearby', {"latitude":latitude,"longitude":longitude}).catch((delivs)=>
        const delivs = fetch('http://localhost:9090/delivery/nearby',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: {"latitude":latitude,"longitude":longitude}
        } ).catch((delivs)=>
        {return {status: 401, message: "delivs not Found"}})
        console.log("delivs", delivs.data)
        if(delivs.status === 200) {
          this.setState({ deliveries: delivs.data });
        }
        else{
          return {status:false, msg: "Get delivery error"};
        }
      }
      else {
        return {status:false, msg: "Your browser does not support Geolocation"};
      }
      // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
      // useGeolocated({
      //     positionOptions: {
      //         enableHighAccuracy: false,
      //     },
      //     userDecisionTimeout: 5000,
      // });
      
      // if (geolocation.isGeolocationAvailable && geolocation.isGeolocationEnabled){
      //     const delivs = await axios.get('http://localhost:9090/delivery/nearby', {"latitude":geolocation.coords.latitude,"longitude": geolocation.coords.longitude}).catch((delivs)=>
      //     {return {status: 401, message: "delivs not Found"}})
      //     console.log("delivs", delivs.data)
      //     if(delivs.status === 200) {
      //       this.setState({ deliveries: delivs.data });
      //     }
      //     else{
      //       return {status:true, msg: "Get delivery error"};
      //     }
      //   }
      //   else {
      //     let msg = geolocation.isGeolocationAvailable ?  "Your browser does not support Geolocation" : "Geolocation is not enabled"
      //     return {status:false, msg: msg};
        
      //   }

      
      return {status:true, msg: "User not found"};
    } else if(login.status === 404) {
      console.log("User not found")
      return {status:false, msg: "User not found"};
    } else {
      return {status:false, msg: "Invalid parameters"};
    }
    
  }


  register = async (photo, birthdate, email, password) => {
    const reg = await axios.post(
      'http://localhost:9090/courier/',
      { email, photo, birthdate, password},
    ).catch((reg) => {
      return { status: 401, message: 'Unauthorized' }
    })
    console.log(reg.status)
    if(reg.status === 200) {

      return {status:true,msg: "success"};
    } else if(reg.status === 201) {
      console.log("email already in use")
      return {status:false, msg: "Email already in use"};
    }
    else if(reg.status === 404) {
      console.log("courirer not found")
      return {status:false, msg: "Courirer not found"};
    }
    else {
      console.log("Invalid parameters")
      return {status:false, msg: "Invalid parameters"};
    }
  }

  logout = e => {
    e.preventDefault();
    // let delivery = localStorage.getItem("delivery");
    this.setState({ user: null , deliveries:null, delivery:null });
    //  let user = localStorage.getItem("user");
    // let delivery = localStorage.getItem("delivery");
    // this.setState({ user: null , deliveries, delivery });
    // const reg = axios.post(
    //   'http://localhost:8080/auth/logout',
    //   { user},
    // ).catch((reg) => {
    //   return { status: 401, message: 'Unauthorized' }
    // })
    // if(reg.status === 200) {
    //   this.setState({ user: null  });
    //   this.setState({ deliveries: []  });
    //   this.routerRef.current.history.push("/login");
    // }
    // else if(reg.status === 404) {
    //   console.log("User not found")
    // }
    // else {
    //   console.log("Invalid parameters")
    // }
    
  };



  accept_delivery = delivery => {

    let user = localStorage.getItem("user");
    console.log("currentjob",delivery)

    const accept = axios.post(
      'http://localhost:9090/delivery/'+delivery.id+'/accept',
      { user},
    ).catch((accept) => {
      return { status: 401, message: 'Unauthorized' }
    })
  
    if (accept.status === 200){
  
        console.log("_Delivery accepted!!!!");
        // this.setState({ delivery: delivery});
        // this.routerRef.current.history.push("/delivery");
        this.setState({ currentJob: delivery});
        this.routerRef.current.history.push("/delivery");
      
    }
    else if (accept.status === 404){
      console.log("Delivery not Found");
    }
    else if (accept.status === 401){
      console.log("Please Login first");
    }
    else if (accept.status === 403){
      console.log("Permission error");
    }
    else{
      console.log("invalid parameters");
    }
  
  };

  done = currentJob => {
    console.log("current job",currentJob)

    let user = localStorage.getItem("user");

    const done = axios.post(
      'http://localhost:9090/delivery/'+currentJob.id+'/deliver',
      { user},
    ).catch((done) => {
      return { status: 401, message: 'Unauthorized' }
    })
  
    if (done.status === 200){
  
      this.setState({ currentJob: null  });
      console.log(this.state.currentJob)
      console.log("Deliver")

      
    }
    else if (done.status === 404){
      console.log("Delivery not Found");
    }
    else if (done.status === 401){
      console.log("Please Login first");
    }
    else if (done.status === 403){
      console.log("Permission error");
    }
    else{
      console.log("invalid parameters");
    }

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
              <Route exact path="/geo" component={GeoLocation} />
              
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}




// let { coords, isGeolocationAvailable, isGeolocationEnabled } =
// useGeolocated({
//     positionOptions: {
//         enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 5000,
// });
// if (isGeolocationAvailable && isGeolocationEnabled){
//   const delivs = await axios.get('http://localhost:9090/delivery/nearby', {"latitude":coords.latitude,"longitude": coords.longitude}).catch((delivs)=>
//   {return {status: 401, message: "delivs not Found"}})
//   console.log("delivs", delivs.data)
//   if(delivs.status === 200) {
//     this.setState({ deliveries: delivs.data });
//   }
//   else{
//     return {status:true, msg: "Get delivery error"};
//     this.setState({ error: "Get delivery error"});
//   }
// }
// else {
//   let msg = isGeolocationAvailable ?  "Your browser does not support Geolocation" : "Geolocation is not enabled"
//   return {status:false, msg: msg};

// }