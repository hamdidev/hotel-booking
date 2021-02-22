import React, { useState } from "react";
import { difDfays } from "../../actions/hotels";
import { currencyFormatter } from "../../actions/stripe";
import OrderModal from "../modals/OrderModal";

const BookingCard = ({ hotel, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card mb-3 ">
        <div className="row no-gutters">
          <div className="col-md-4">
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                alt="Hotel Image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=BOOKING"
                alt="Hotel Image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-4">
            <div className="card-boby">
              <h3 className="card-title">
                {hotel.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: hotel.price * 100,
                    currency: "usd",
                  })}
                </span>
              </h3>
              <div className="alert alert-info">{hotel.location}</div>
              <p className="card-text">{`${hotel.content.substring(
                1,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {difDfays(hotel.from, hotel.to)}
                  {difDfays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">{hotel.bed} bed </p>
              <p className="card-text">
                Available form {new Date(hotel.from).toLocaleDateString()}{" "}
              </p>
              {showModal && (
                <OrderModal
                  session={session}
                  orderedBy={orderedBy}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}

              <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-primary "
                >
                  Show Payment info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
