import React from "react";
import withContext from "../withContext";
import './Specification.css';
import { Redirect } from "react-router-dom";

function getDistanceFromLatLonInKm(lat2,lon2) {
  var lat1 = localStorage.getItem("latitude");
  var lon1= localStorage.getItem("longitude");
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = Math.round(R * c); // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}



const DeliverDelivery = props => {
  const {currentJob} = props.context;
  const {user} = props.context;
  console.log(currentJob.delivery)
  return (
    user ? (
    <>
      <div className="hero is-warning">
        <div className="hero-body container">
          <h4 className="title">Deliver delivery</h4>
        </div>
      </div>
      <br />


      <main className="container">
      <div className="right-column">
        <div className="product-description">
        <p>User: <b>{currentJob.delivery.contact.name}</b></p>
          <p></p>
          <p>Addres: <b>{currentJob.delivery.contact.address}</b></p>
          <p></p>
          <p>Phone: <b>{currentJob.delivery.contact.phone_number}</b></p>
          <p></p>
          {/*<p>Distance to Client:  <b>{getDistanceFromLatLonInKm(currentJob.delivery.address.latitude,currentJob.delivery.address.longitude)} km</b></p> */}
          <p></p>
          <p>Order status: <b>{currentJob.delivery.orderStatus.status}</b></p>
        </div>
          <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() => props.context.done( { currentJob})}
              >
                deliver
              </button>
        </div>
      </main>
    </>) : (
        <Redirect to="/login" />

    )
  );
};
/* const Done = (props, history) => {
  console.log("current job")
  console.log(props)
  console.log(history)
  // this.state({delivery:null})
  
  // history.push("/login");

} */

export default withContext(DeliverDelivery);