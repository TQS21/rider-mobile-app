import React from "react";
import Delivery from "./Delivery";
import withContext from "../withContext";

const DeliveriesList = props => {
  const { Deliveries } = props.context;


  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Deliveries</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
        {
            Deliveries.map((delivery, index) => (
              <Delivery
                delivery={delivery}
                key={index}
              />
            ))
        }
        </div>
      </div>
    </>
  );
};

export default withContext(DeliveriesList);
