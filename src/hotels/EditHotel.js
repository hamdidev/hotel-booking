import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Select } from "antd";
import { read, updateHotel } from "../actions/hotels";
import { useSelector } from "react-redux";
import EditHotelForm from "../components/forms/EditHotelForm";
// import HotelCreateForm from "../components/forms/HotelCreateForm";
// const { Option } = Select;

const EditHotel = ({ match }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [image, setImage] = useState("");
  const { title, content, price, from, to, bed, location } = values;

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };
  // handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    try {
      let res = await updateHotel(token, hotelData, match.params.hotelId);
      console.log("HOTEL UPDATE RES", res);
      toast.success(`${res.data.title} is updated successfully.`);
    } catch (error) {
      console.log(error);
      // toast.error(error.reponse.data.error);
    }
  };
  // handleChange
  const handleImgChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary  p-5 text-center bg">
        <h2 className="heading">Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <EditHotelForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImgChange={handleImgChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="image_preview"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
