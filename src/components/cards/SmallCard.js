import React from "react";
import { Link, useHistory } from "react-router-dom";
import { difDfays } from "../../actions/hotels";
import { currencyFormatter } from "../../actions/stripe";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  h,
  handleDeleteHotel = (f) => f,
  owner = false,
  showViewBtn = true,
}) => {
  const history = useHistory();

  return (
    <>
      <div className="card mb-3 ">
        <div className="row no-gutters">
          <div className="col-md-4">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
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
                {h.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price * 100,
                    currency: "usd",
                  })}
                </span>
              </h3>
              <div className="alert alert-info">{h.location}</div>
              <p className="card-text pl-2">{`${h.content.substring(
                1,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {difDfays(h.from, h.to)}
                  {difDfays(h.from, h.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">{h.bed} bed </p>
              <p className="card-text">
                Available from {new Date(h.from).toLocaleDateString()}{" "}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewBtn && (
                  <button
                    onClick={() => history.push(`/hotel/${h._id}`)}
                    className="btn btn-primary "
                  >
                    Show more
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined className="text-warning" title="Edit" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleDeleteHotel(h._id)}
                      className="text-danger"
                      title="Delete"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
