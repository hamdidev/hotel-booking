import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userHotleBookings } from "../actions/hotels";
import BookingCard from "../components/cards/BookingCard";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav";

const Dashboard = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    loadUserBookedHotels();
  }, []);

  const loadUserBookedHotels = async () => {
    const res = await userHotleBookings(token);
    console.log(res);
    setBooking(res.data);
  };
  return (
    <>
      <div className="container-fluid p-5 bg">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Bookings</h2>
          </div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        {booking.map((b) => (
          <BookingCard
            key={b._id}
            hotel={b.hotel}
            session={b.session}
            orderedBy={b.orderedBy}
          />
        ))}
      </div>
      {/* <pre>{JSON.stringify(booking, null, 4)}</pre> */}
    </>
  );
};

export default Dashboard;
