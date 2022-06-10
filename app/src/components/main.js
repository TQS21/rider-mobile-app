import React from 'react'
//import md5 from "react-native-md5";
import { useNavigate } from "react-router-dom";

export default function Main({token}) {

  let navigate = useNavigate();

  const logout = () => {
    console.log(token)
    navigate('../login');
    /* fetch('http://deti-tqs-05:8080/logout?token='+token, {

      method: 'POST',
    }).then((response)=>{
      if (response.ok){
        response.json().then((logins) => {
          console.log("worked2!!!!")

          navigate('login');

        })
      }
      else if (response.status === 404){
      }
      else{
      }
      
    }) */

    return 
  }

    return (
        <div>
        <h3>Orders</h3>


        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={logout}>
            logout
          </button>
        </div>
        </div>
        
    )
}
