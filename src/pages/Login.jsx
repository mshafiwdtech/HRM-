import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSubmit } from "../store/actions/Login";

import { useForm } from "react-hook-form";
export default function LoginPage() {
  let history = useHistory();

  const dispatch = useDispatch();

  let login = (data) => {
    dispatch(loginSubmit(data, history));
    // history.replace(from);
    reset();
  };

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const { loader } = useSelector((state) => state.login);

  return (
    // authToken ? (
    //   <Redirect to="/" />
    // ) : (
    // <div className="login">
    //   <div className="loginContainer">
    <div className="login-wrap">
      <div className="login-html">
        <div className="container" style={{maxWidth:"330px"}}>
          <form onSubmit={handleSubmit(login)}>
            <h1
              // className="heading"
              style={{ color: "white" }}
            >
              Sign In
            </h1>

            <label
              htmlFor="email"
              style={{ color: "white", margin: 10, fontSize: 12 }}
            >
              EMAIL ADDRESS
            </label>
            <div
              style={{
                marginLeft: 0,
                marginTop: 10,
              }}
            >
              <input
                id="email"
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                type="email"
                placeholder="Enter Email Address"
                color="#647c6c"
                style={{
                  height: 50,
                  width: "100%",
                  backgroundColor: "#E8F0FE",
                  borderColor: "gray",
                  paddingLeft: 20,
                }}
                class="loginInput"
              />
            </div>
            <div style={{ marginLeft: 30, marginTop: 5, marginBottom: 10 }}>
              {errors.email && (
                <span role="alert" style={{ color: "red", fontSize: 12 }}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <label
              htmlFor="email"
              style={{ color: "white", margin: 0, fontSize: 12 }}
            >
              PASSWORD
            </label>
            <div
              style={{
                marginLeft: 0,
                marginTop: 10,
              }}
            >
              <input
                id="password"
                {...register("password", {
                  required: "required",
                  minLength: {
                    value: 5,
                    message: "min length is 5",
                  },
                })}
                type="password"
                placeholder="Password"
                color="#647c6c"
                style={{
                  height: 50,
                  width: "100%",
                  backgroundColor: "#E8F0FE",
                  borderColor: "gray",
                  paddingLeft: 20,
                 
                }}
                class="loginInput"
              />
            </div>
            <div style={{ marginLeft: 30, marginTop: 10, marginBottom: 10 }}>
              {errors.password && (
                <span role="alert" style={{ color: "red", fontSize: 12 }}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <input
                type="submit"
                style={{
                  height: 50,
                  width: "100%",
                  backgroundColor: "#1061ee",
                  borderColor: "#1061ee",
                  color:"white",
                  fontSize:"15px",
                  fontWeight:500,
                  marginLeft: 0,
                  marginTop: 20,
                }}
                class="loginInput"
              />
              {loader ? <label>Login...</label> : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
