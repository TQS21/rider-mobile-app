import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

class Register extends Component {
    constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      birthdate:"",
      photo:"",
    };
  }
  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });


  onSubmit = data => {
    
    console.log(data)
    fetch('http://deti-tqs-05:8080/courier?email='+data.email+'&password='+data.password, {
      method: 'POST',
      data : {
        "name" : data.name,
        "photo" : data.photo,
        "birthdate" : data.birthdate,
        "password" : data.password,}
    }).then((response)=>{
      if (response.ok){
        response.json().then((logins) => {

          console.log("working!!!!");
        })
      }
      else if (response.status === 404){
        console.log("User not Found");
      }
      else{
        console.log("invalid parameters");
      }
      
    }) 
    return 
  };
  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Register</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Username: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Birthdate: </label>
                <input
                  className="input"
                  type="date"
                  name="birthdate"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Photo: </label>
                <input
                  className="input"
                  type="text"
                  name="photo"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label" >Repeat Password: </label>
                <input
                  className="input" type="password"
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                >
                  Submit
                </button>
              </div>
              
            </div>
            
          </div>
        </form>
        
      </>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default withContext(Register);