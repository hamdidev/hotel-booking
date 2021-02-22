import axios from "axios";

export const register = async (user) =>
  axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  axios.post(`${process.env.REACT_APP_API}/login`, user);

// update the user at LS
export const updateUserInLS = (user, next) => {
  if (localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
