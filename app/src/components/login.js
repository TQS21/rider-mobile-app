
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.login(username, password)
      .then((loggedIn) => {
        if (!loggedIn) {
          this.setState({ error: "Invalid Credentails" });
        }
        else{
        }
      })
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.login}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Email: </label>
                <input
                  className="input"
                  type="email"
                  name="username"
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
              <a href="/register" style={{marginLeft:'25%'}}>If you are not registered, click here!</a>

            </div>
          </div>
        </form>
      </>
    ) : (
      <Redirect to="/products" />
    );
  }
}

export default withContext(Login);

/* import React from 'react'
//import { emailValidator } from '../helpers/emailValidator'
//import { passwordValidator } from '../helpers/passwordValidator'
//import md5 from "react-native-md5";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";



export default function Login() {
  let navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  // const onSubmit = data => console.log(data);


  const onSubmit = data => {
    
    console.log(data)

    navigate('../home',
          {
            token: "logins[token]",
          });

    /* fetch('http://deti-tqs-05:8080/login?email='+data.email+'&password='+data.password, {

      method: 'POST',
    }).then((response)=>{
      if (response.ok){
        response.json().then((logins) => {

          navigate('home',
          {
            token: logins["token"],
          }
          );
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
  }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Rider Log In</h3>

        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            //value={defaultState.email}
            //onChangeText={(text) => defaultState.email= text}
            aria-invalid={errors.name ? "true" : "false"}
            {...register("email", { required: true ,pattern: /\S+@\S+\.\S+/})}
          />
          {errors.email && errors.email.type === "required" && (
            <span class="text-danger" role="alert">The email is required</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span class="text-danger" role="alert">Wrong pattern</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            {...register("password", { required: true, minLength: 5 })}
          />
          {errors.password && errors.password.type === "required" && (
            <span class="text-danger" role="alert">The password is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span  class="text-danger" role="alert"> The password is too short</span>
          )}


        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    )
} */



