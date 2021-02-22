import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { toast } from "react-toastify";
import { sellerHotels, deleteHotel } from "../actions/hotels";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);

  const handleDeleteHotel = async (hotelId) => {
    if (!window.confirm("Are you sure?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel deleted successfully.");
      showSellerSHotels();
    });
  };

  const isConnected = () => (
    <div className="container-fluid  ">
      <div className="row">
        <div className="col-md-10 ">
          <h2>Your Hotels</h2>
        </div>
        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>
      <div className="row">
        {hotels.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewBtn={false}
            owner={true}
            handleDeleteHotel={handleDeleteHotel}
          />
        ))}
      </div>
    </div>
  );

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
      toast.error("Stripe connect failed, Try again later.");
      setLoading(false);
    }
  };
  const isNotConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className=" p-5">
            <HomeOutlined className="h3" />
            <h4>Set up payouts to post hotel rooms</h4>
            <p className="lead">
              MERN partners with stripe to transfer your earnings to your bank
              account.
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Set up Payouts"}
            </button>
            <p className="text-muted">
              You'll be redirected to Stripe to complete the onboarding process
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    showSellerSHotels();
  }, []);
  const showSellerSHotels = async () => {
    let { data } = await sellerHotels(auth.token);
    setHotels(data);
  };

  return (
    <>
      <div className="container-fluid p-5 bg ">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? isConnected()
        : isNotConnected()}
    </>
  );
};

export default DashboardSeller;
