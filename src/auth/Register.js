import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";
import { register } from "../actions/auth.js";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        name,
        email,
        password,
      });
      console.log(response, "Register user===>");
      toast.success("Register success. Please log in.");
      history.push("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid  p-5 text-center">
        <h2> Register</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
