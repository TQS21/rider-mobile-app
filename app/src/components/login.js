import React from 'react'
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
      
    }) */

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
        {/* <span className="text-danger">{defaultState.emailError}</span> */}
        {/* <span >{defaultState.email}</span> */}
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            //value={defaultState.password}
            //onChangeText={(text) => defaultState.password= text}
            {...register("password", { required: true, minLength: 5 })}
          />
          {errors.password && errors.password.type === "required" && (
            <span class="text-danger" role="alert">The password is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span  class="text-danger" role="alert"> The password is too short</span>
          )}


        </div>
        {/* <span className="text-danger">{defaultState.passwordError}</span> */}
        {/* <span >{defaultState.password}</span> */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    )
}
