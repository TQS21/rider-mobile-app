import React from "react";
import Delivery from "./Delivery";
import withContext from "../withContext";

const DeliveryList = (deliv, token) => {
  const { deliveries } = deliv.context;

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
          {deliveries && deliveries.length ? (
            deliveries.map((delivery, index) => (
              <Delivery
                delivery={delivery}
                key={index}
                token = {token}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No deliveries found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(DeliveryList);
