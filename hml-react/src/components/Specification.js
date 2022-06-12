import React from "react";
import withContext from "../withContext";
import './Specification.css';

const Specification = props => {
  const {delivery} = props.location.state;
  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Deliveries</h4>
        </div>
      </div>
      <br />


      <main class="container">
      <div class="right-column">
        <div class="product-description">
          <h1>{delivery.product.name}</h1>
          <h4>in {delivery.Shop.name}</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices, erat id venenatis venenatis, purus tortor fermentum ipsum, in fringilla eros felis non justo. Morbi placerat lorem a elit pellentesque auctor. </p>
        </div>
        <button
              className="button is-small is-outlined is-primary   is-pulled-right"
              onClick={Accept(delivery.id)}
            >
              Accept
            </button>
        </div>
      </main>
    </>
  );
};


const Accept = (props, id) => {

  fetch('http://deti-tqs-05:8080/delivery'+id, {
      method: 'POST',
      token: props.user,
    }).then((response)=>{
      if (response.ok){
        response.json().then((logins) => {

          console.log("Delivery accepted!!!!");
          /* return (
            {
              <Alert key=success variant=success'>
                The delviery was accepted
              </Alert>
          }
          ) */
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
      
    }) 
}


export default withContext(Specification);