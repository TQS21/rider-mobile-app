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
        </div>
      </main>
    </>
  );
};

export default withContext(Specification);