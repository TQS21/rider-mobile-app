import React from "react";
import withContext from "../withContext";
import './Specification.css';
import { Redirect, Link } from "react-router-dom";


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
          <p>Product:</p>
          {delivery.deliveries.map((delivery, i) => {     
           // Return the element. Also pass key     
           return (<b>{delivery}</b>) 
        })}
          <p>Address: <b>{delivery.shopOrderRef.address}</b></p>
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