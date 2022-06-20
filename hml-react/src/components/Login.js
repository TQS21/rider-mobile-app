import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();


    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.login(email, password)
      .then((loggedIn) => {
        if (!loggedIn.status) {
          this.setState({ error: loggedIn.msg });

        }
        else{
          console.log("context",this.props.context)
          // this.routerRef.current.history.push("/delivery");

        }
      })
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-warning " >
          <div className="hero-body container">
            <h4 className="title">Rider Login</h4>
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
                  name="email"
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
      <Redirect to="/deliveries" />
      // <Redirect to="/geo" />
    );
  }
}

export default withContext(Login);
