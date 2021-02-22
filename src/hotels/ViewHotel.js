import React, { useEffect, useState } from "react";
import { difDfays, read, isAlreadyBooked } from "../actions/hotels";
import moment from "moment";
import { useSelector } from "react-redux";
import { getSessionId } from "../actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

const ViewHotel = ({ match, history }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.params.hotelId).then((res) => {
        // console.log(res);
        if (res.data.ok) setAlreadyBooked(true);
      });
    }
  }, []);

  const handleClicktToLogin = async (e) => {
    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);
    e.preventDefault();

    if (!auth) history.push("/login");
    console.log(auth.token, match.params.hotelId);
    let res = await getSessionId(auth.token, match.params.hotelId);
    // console.log("get sessionId response", res.data.sessionId);

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };

  return (
    <>
      <div className="container-fluid bg-secondary  p-5 text-center bg">
        <h2 className="heading">{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>
          <div className="col-md-6">
            <br />
            <strong>{hotel.content}</strong>
            <p className="alert alert-info mt-3">${hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {difDfays(hotel.from, hotel.to)}
                {difDfays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i> Added by: {hotel.addedBy && hotel.addedBy.name}</i>
            <br />
            <button
              onClick={handleClicktToLogin}
              className="btn btn-primary btn-larg mt-3 btn-block"
              disabled={loading || alreadyBooked}
            >
              {loading
                ? "Processing..."
                : alreadyBooked
                ? "Already Booked"
                : auth && auth.token
                ? " Book Now"
                : "Log in to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
