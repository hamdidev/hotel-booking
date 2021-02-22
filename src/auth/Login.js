import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { login } from "../actions/auth.js";
import LoginForm from "../components/LoginForm.js";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });
      if (res.data) {
        console.log("save user to redux and local storage then redirect===>");
        // console.log(res.data);
        // save user and token in LS
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        // save user and token in REDUX
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        history.push("/");
      }
      toast.success("You're logged in.");
      //history.push("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };
  return (
    <>
      <div className="container-fluid  p-5 ">
        <h2 className="text-center">Login</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <LoginForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Login;
