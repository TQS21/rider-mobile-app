import React from "react";
import withContext from "../withContext";
import './Specification.css';
import { Redirect, Link } from "react-router-dom";

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


const Specification = props => {
  const {delivery} = props.location.state;
  const {user} = props.location.state;

  return (
    ! user ? (
      <Redirect to="/login" /> 
    ) : ( 
    <>
      <div className="hero is-warning">
        <div className="hero-body container">
          <h4 className="title">Delivery Detail</h4>
        </div>
      </div>
      <br />


      <main className="container">
      <div className="right-column">
        <div className="product-description">
          
          <p>Shop: <b>{delivery.shop.name}</b></p>
          <p></p>
          <p>Addres: <b>{delivery.contact.address}</b></p>
          <p></p>
          <p>Phone: <b>{delivery.contact.phone_number}</b></p>
          <p></p>
          <p>Distance to shop:  <b>{getDistanceFromLatLonInKm(delivery.shop.address.latitude,delivery.shop.address.longitude)} km</b></p>
          <p></p>
          <p>Distance to Client:  <b>{getDistanceFromLatLonInKm(delivery.address.latitude,delivery.address.longitude)} km</b></p>
          <p></p>
          <p>Order status: <b>{delivery.orderStatus.status}</b></p>
          {/* <p>Product:</p>
          {delivery.map((delivery, i) => {     
           // Return the element. Also pass key     
           return (<b>{delivery}</b>) 
        })} */}
          {/* <p>Address: <b>{delivery.shopOrderRef.address}</b></p> */}
        </div>
        <Link to={{pathname:'/currentJob', state:{delivery : delivery, user: user}}}>
          <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() => props.context.accept_delivery( { delivery})}
              >
                Accept
              </button>
            </Link>

        </div>
      </main>
    </>)
  );
};




export default withContext(Specification);