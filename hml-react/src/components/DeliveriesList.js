import React from "react";
import Delivery from "./Delivery";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";

const DeliveriesList = props => {
  const { deliveries } = props.context;
  const { user } = props.context;
  const { currentJob } = props.context;


  return (
     ! user ? (
          <Redirect to="/login" /> 
        ) : ( !currentJob ? (
          <>
            <div className="hero is-primary">
              <div className="hero-body container">
                <h4 className="title">deliveries</h4>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="column columns is-multiline">
              {
                  deliveries.map((delivery, index) => (
                    <Delivery
                      delivery={delivery}
                      key={index}
                      user={user}
                      accept_delivery={props.context.accept_delivery}
                      done={props.context.done}
                    />
                  ))
              }
              </div>
            </div>
    </>) : (
        <Redirect to="/currentJob" />

    ))
  );
};

export default withContext(DeliveriesList);
