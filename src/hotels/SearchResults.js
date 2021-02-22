import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Search from "../components/forms/Search";
import { searchListings } from "../actions/hotels";
import SmallCard from "../components/cards/SmallCard";

const SearchResults = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState([]);

  // when component mounts, get search params from the url and send search query to backend
  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    searchListings({ location, date, bed }).then((res) => {
      setHotels(res.data);
    });
  }, [window.location.search]);

  return (
    <div className="container">
      <Search />
      <div className="row">
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
