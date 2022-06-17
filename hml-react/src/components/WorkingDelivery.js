import React from "react";
import withContext from "../withContext";
import './Specification.css';
import { Redirect } from "react-router-dom";


const WorkingDelivery = props => {
  const {delivery} = props.location.state;
  const {user} = props.location.state;
  return (
    user ? (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Working delivery</h4>
        </div>
      </div>
      <br />


      <main className="container">
      <div className="right-column">
        <div className="product-description">
           <h1>{delivery.product.name}</h1> 
           <h4>in {delivery.Shop.name}</h4> 
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices, erat id venenatis venenatis, purus tortor fermentum ipsum, in fringilla eros felis non justo. Morbi placerat lorem a elit pellentesque auctor. </p>
        </div>
          <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() => props.context.done( { delivery})}
              >
                Done
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

export default withContext(WorkingDelivery);