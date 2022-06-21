import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import Login from './components/Login';
import DeliveriesList from './components/DeliveriesList';
import Specification from './components/Specification';
import Register from './components/Register';
import CollectDelivery from './components/CollectDelivery';
import DeliverDelivery from './components/DeliverDelivery';
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
  

    
  showPosition = (pos) => {
      // localStorage.setItem("latitude", pos.coords.latitude) 
      // localStorage.setItem("longitude", pos.coords.longitude)
      localStorage.setItem("latitude", 40.6313668 )
      localStorage.setItem("longitude", -8.6598972 )
  }
    
  login = async (email, password) => {
    // let geolocation = GeoLocation
    console.log(email,password)
    const login = await axios.post('http://deti-tqs-05:9090/auth/login', {email, password}).catch((err)=>
    {return {status: err.response.status, message: err.code}})

    console.log("token",login)
    if(login.status === 200) {
      let token = login.data.token
      
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.showPosition);
        // let latitude = localStorage.getItem("latitude")
        // let longitude = localStorage.getItem("longitude")
        let latitude = 40.6313668 
        let longitude = 8.6598972
        
        console.log("latitude",latitude)
        console.log("longitude",longitude)

    

        // const delivs = await axios.get('http://deti-tqs-05:9090/delivery/').catch((err)=> 
        //  {return {status: err.status, message: err.code}})
         const delivs = await axios.post('http://deti-tqs-05:9090/delivery/nearby', 
                  { "latitude":latitude,
                    "longitude":longitude
              }).catch((err)=> 
          {return {status: err.status, message: err.code}})

          console.log("delivs", delivs) 
          if(delivs.status === 200) {
            this.setState({ user: token });
            this.setState({ deliveries: delivs.data });
            console.log("delivs success")
            return  {status:true, msg: "delivery success"}
          }
          else{
            console.log("delivs error", delivs.status)

            return {status:false, msg: "Get delivery error"};
          }
      }
      else {
        return {status:false, msg: "Your browser does not support Geolocation"};
      }

    } else if(login.status === 404) {
      console.log("User not found")
      return {status:false, msg: "User not found"};
    } else {
      return {status:false, msg: "Invalid parameters"};
    }
    
  }


  register = async (photo, birthdate, email, password) => {
    const reg = await axios.post(
      'http://deti-tqs-05:9090/courier/',
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
    this.setState({ user: null , deliveries:[], delivery:null });
    this.routerRef.current.history.push("/login");
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



  accept_delivery = async(delivery) => {

    let user = this.state.user

    console.log("currentjob",delivery)
    console.log("id",delivery.delivery.id)
    let id = delivery.delivery.id
    this.setState({ currentJob: delivery});
    
    let config = {
      headers: {
        "Authorization": "  Bearer "+user,
      }
    }

    const accept = await axios.post(
      'http://deti-tqs-05:9090/delivery/'+id+'/accept',{} ,config
    ).catch((err) => {
      console.log(err);return { status: err.status, message: err.message }
    })
    // this.setState({ currentJob: delivery});
    // localStorage.setItem("currentJob", delivery )
    console.log(accept)
    // this.setState({ currentJob: delivery});
    if (accept.status === 200){
  
        console.log("_Delivery accepted!!!!");
        // this.setState({ delivery: delivery});
        // this.routerRef.current.history.push("/delivery");
        this.setState({ currentJob: delivery});
        // localStorage.setItem("currentJob", delivery )
        this.routerRef.current.history.push("/collectProduct");
      
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
    this.routerRef.current.history.push("/collectProduct");
  
  };

  collect = async(currentJob) => {
    console.log("current job",currentJob)

    let user = this.state.user
    let id = currentJob.currentJob.delivery.id

    let config = {
      headers: {
        "Authorization": "Bearer "+user,
      }
    }

    const done = await axios.post(
      'http://deti-tqs-05:9090/delivery/'+id+'/collect', {},config
      // ,{ user}
    ).catch((err) => {
      console.log(err);return { status: 401, message: 'Unauthorized' }
    })
    console.log(done);
    if (done.status === 200){
  
      console.log("collect")
      this.routerRef.current.history.push("/deliverProduct");

      
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
    this.routerRef.current.history.push("/deliverProduct");
  
  }

  done = async(currentJob) => {
    console.log("current job",currentJob)

    let user = this.state.user

    let config = {
      headers: {
        "Authorization": "Bearer "+user,
      }
    }
    let id = currentJob.currentJob.delivery.id
    const done = await axios.post(
      'http://deti-tqs-05:9090/delivery/'+id+'/deliver', {},config
      // ,{ user}
    ).catch((done) => {
      return { status: 401, message: 'Unauthorized' }
    })
    if (done.status === 200){
  
      // this.setState({ currntJob: null  });
      console.log(this.state.currentJob)
      console.log("Deliver")
      localStorage.setItem("currentJob", null )

      
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


  // const delivs = await axios.get('http://deti-tqs-05:9090/delivery/').catch((err)=> 
  // {return {status: err.status, message: err.code}})
  //if (navigator.geolocation){
  //  navigator.geolocation.getCurrentPosition(this.showPosition);
    // let latitude = localStorage.getItem("latitude")
    // let longitude = localStorage.getItem("longitude")
    let latitude = 40.6313668 
    let longitude = 8.6598972
    const delivs = await axios.post('http://deti-tqs-05:9090/delivery/nearby', 
             { "latitude":latitude,
               "longitude":longitude
         }).catch((err)=> 
     {return {status: err.status, message: err.code}})
   this.setState({ deliveries: delivs.data });
   console.log("delivs", delivs) 
   if(delivs.status === 200) {
     this.setState({ deliveries: delivs.data });
     console.log("delivs success")
   }
   else{
     console.log("delivs error", delivs.status)

   }
  //  this.setState({ currentJob: null });

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
          collect:  this.collect,
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
              <b className="navbar-item is-size-4 ">DE</b>
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
              <Route exact path="/collectProduct" component={CollectDelivery} />
              <Route exact path="/deliverProduct" component={DeliverDelivery} />
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
//   const delivs = await axios.get('http://localhost:8080/delivery/nearby', {"latitude":coords.latitude,"longitude": coords.longitude}).catch((delivs)=>
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