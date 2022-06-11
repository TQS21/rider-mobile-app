import React from "react";
import {Link} from "react-router-dom";

const Delivery = props => {
  const { delivery } = props;
  return (
    <div className=" column is-half" style={{marginTop:30}}>
      <div className="box">
        <div className="media">
          <div className="media-content">
            <div>{delivery.Product.name} available at {delivery.Shop.name}</div>
            <div className="is-clearfix">
            <button
                  className="button is-small is-outlined is-primary   is-pulled-right"
                  onClick={Accept(delivery.id)}
                >
                  Accept
                </button>
              <Link to={{pathname:'/Specification', state:{delivery : delivery}}}>
                <button
                  className="button is-small is-outlined is-primary   is-pulled-right"
                >
                  See Details
                </button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Accept = (props, id) => {

  fetch('http://deti-tqs-05:8080/delivery'+id, {
      method: 'POST',
      token: props.user,
    }).then((response)=>{
      if (response.ok){
        response.json().then((logins) => {

          console.log("working!!!!");
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


export default Delivery;
