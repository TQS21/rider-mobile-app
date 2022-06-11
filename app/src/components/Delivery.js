import React from "react";

const accept = (token, delivery) => {
  fetch('http://deti-tqs-05:8080/delivery'+delivery.id, {

    method: 'POST',
    headers: new Headers({
      'token': token
  }), 
  }).then((response)=>{
    if (response.ok){
      console.log("working_accept!!!!");

    }
    else if (response.status === 404){
      console.log("Delivery not Found");

    }
    else if (response.status === 401){
      console.log("Login first");

    }
    else if (response.status === 403){
      console.log("Permission Error");

    }
    else{
      console.log("invalid parameters");

    }
})
}

const Delivery = props => {
  const { delivery } = props;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">Shop: ${delivery.Shop.name}</span>
            </b>
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">Client: ${delivery.contact.name}</span>
            </b>
            <small>Location ${delivery.address.latitude} ${delivery.address.longitude}</small>
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={accept(token,delivery)}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Delivery;
