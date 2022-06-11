import React from 'react'
//import md5 from "react-native-md5";
import { useNavigate, Link } from "react-router-dom";

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

        {/*  <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 ">HML</b>
              <label
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
              <div className="container">
                <Link className="navbar-brand" to={'/home'}>
                  HML
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={'/home'}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={logout} to={'/login'}>
                        Logout
                      </Link>
                    </li>

                    
                  </ul>
                </div>
              </div>
            </nav>  */}
        <h3>Orders</h3>
        
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={logout}>
            logout
          </button>
        </div>
        </div>
        
    )
}
