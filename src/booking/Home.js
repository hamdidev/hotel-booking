import { useEffect, useState } from "react";
import { allHotels } from "../actions/hotels";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";
import "./home.css";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    showAllHotels();
  }, []);
  const showAllHotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };
  return (
    <>
      <div className="container-fluid bg p-5 text-center">
        <h2 className="heading">All Hotels</h2>
      </div>
      <br />
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container-fluid">
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

export default Home;
