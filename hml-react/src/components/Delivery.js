import React from "react";
import {Link} from "react-router-dom";

const Delivery = props => {
  const { delivery } = props;
  const { user } = props;
  return (
    <div className=" column is-half" style={{marginTop:30}}>
      <div className="box">
        <div className="media">
          <div className="media-content">
            <div>{delivery.product.name} available at {delivery.Shop.name}</div>
            <div className="is-clearfix">
            <Link to={{pathname:'/currentJob', state:{delivery : delivery, user: user}}}>
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
 