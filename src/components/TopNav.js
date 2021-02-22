import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const TopNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <>
      <div className="nav bg-light d-flex justify-content-between w-100">
        <div>
          <Link className="nav-link logo" to="/">
            Hotelz
          </Link>
        </div>

        <div className="d-flex">
          {auth !== null && (
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          )}

          {auth !== null && (
            <a className="nav-link pointer" onClick={logout}>
              Log out
            </a>
          )}

          {auth === null && (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNav;
