import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInLS } from "../actions/auth";
const StripeCallback = ({ history }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth && auth.token) accountStatus();
  }, [auth]);

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      // console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);
      updateUserInLS(res.data, () => {
        // update user in redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        // redirect user to DB
        // window.location.href = "/dashboard/seller";
        history.push("/dashboard/seller");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="h2 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;
