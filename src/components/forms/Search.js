import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import AlgoliaPlaces from "algolia-places-react";
import { useHistory } from "react-router-dom";

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  countries: ["us"],
};

// desctructured values from components
const { RangePicker } = DatePicker;
const { Option } = Select;
// state
const Search = () => {
  const [location, setLocation] = useState("Turkey, Istanbul");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");
  const history = useHistory();

  const handleSearch = () => {
    history.push(
      `/search-results?location=${location}&date=${date}&bed=${bed}`
    );
  };

  return (
    <div className="d-flex pb-4 ">
      <div className="w-100">
        <AlgoliaPlaces
          placeholder="Location"
          defaultValue={location}
          options={config}
          onChange={({ suggestions }) => setLocation(suggestions.value)}
          style={{ height: "50px" }}
        />
      </div>
      <RangePicker
        onChange={(value, dateString) => setDate(dateString)}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        className="w-100"
      />
      <Select
        onChange={(value) => setBed(value)}
        className="w-100"
        size="large"
        placeholder="Number of beds"
      >
        <Option key={1}>1</Option>
        <Option key={2}>2</Option>
        <Option key={3}>3</Option>
        <Option key={4}>4</Option>
      </Select>
      <SearchOutlined
        onClick={handleSearch}
        className="btn btn-primary p-3 btn-square"
      />
    </div>
  );
};

export default Search;
