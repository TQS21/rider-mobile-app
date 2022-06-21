import React from "react";
import {Link} from "react-router-dom";

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

const Delivery = props => {
  const { delivery } = props;
  const { user } = props;
  return (
    <div className=" column is-half" style={{marginTop:30}}>
      <div className="box">
        <div className="media">
          <div className="media-content">
            <p>Shop: {delivery.shop.name}</p>
            <p>Distance to shop: {getDistanceFromLatLonInKm(delivery.shop.address.latitude,delivery.shop.address.longitude)} km</p>
            <p>Address: {delivery.contact.address}</p>
            {/*<p>Distance to Client: {getDistanceFromLatLonInKm(delivery.address.latitude,delivery.address.longitude)} km</p>*/}
            <p>Order status: <b>{delivery.orderStatus.status}</b></p>
            <div className="is-clearfix">
            <Link to={{pathname:'/collectProduct', state:{delivery : delivery, user: user}}}>
              <button
                    className="button is-small is-outlined is-primary   is-pulled-right"
                    onClick={() => props.accept_delivery( { delivery})}
                    // onClick={accept_del(delivery)}
                  >
                    Accept
                  </button>
              </Link>

              <Link to={{pathname:'/Specification', state:{delivery : delivery, user: user}}}>
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

/* const accept_del = (props) => {
  console.log(props)

} */

/* 
const accept_del = (props, delivery) => {
  console.log(props)
  console.log(delivery)
  let response = {status:200 , data:{}}

  if (response.status === 200){

      console.log("Delivery accepted!!!!");
      //this.setState({ delivery: delivery});
      //this.routerRef.current.history.push("/delivery");
      props.state.currentJob = delivery
      console.log(props)
      // this.routerRef.current.history.push("/currentJob");



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

  /* fetch('http://deti-tqs-05:8080/delivery'+id, {
      method: 'POST',
      token: props.user,
    }).then((response)=>{
      if (response.ok){
        response.json().then((logins) => {

          console.log("Delivery accepted!!!!");
          this.setState({ delivery: delivery});
          this.routerRef.current.history.push("/delivery");


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
*/

export default Delivery;
 