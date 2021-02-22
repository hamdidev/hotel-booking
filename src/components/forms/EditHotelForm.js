import moment from "moment";
import AlgoliaPlaces from "algolia-places-react";
import { DatePicker, Select } from "antd";
const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  countries: ["us"],
};

const { Option } = Select;

const EditHotelForm = ({
  values,
  setValues,
  handleChange,
  handleImgChange,
  handleSubmit,
}) => {
  const { title, content, price, location, bed, from, to } = values;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-froup">
          <label className="btn btn-outline-secondary btn-block m-2 text-left ">
            Add image
            <input
              type="file"
              name="image"
              onChange={handleImgChange}
              accept="image/*"
              hidden
              // value={image}
            />
          </label>
          <input
            className="form-control m-2"
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            value={title}
          />
          <textarea
            className="form-control m-2"
            name="content"
            onChange={handleChange}
            placeholder="Content"
            value={content}
          />

          {location && location.length && (
            <AlgoliaPlaces
              className="form-control ml-2 mr-2"
              placeholder="Location"
              defaultValue={location}
              options={config}
              onChange={({ suggestion }) =>
                setValues({ ...values, location: suggestion.value })
              }
              style={{ height: "50px" }}
            />
          )}

          <input
            className="form-control m-2"
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="Price"
            value={price}
          />

          <Select
            onChange={(value) => setValues({ ...values, bed: value })}
            className="w-100 m-2"
            size="large"
            placeholder="Number of beds"
            value={bed}
          >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
          </Select>
        </div>

        {from && (
          <DatePicker
            defaultValue={moment(from, "YYYY-MM-DD")}
            placeholder="From date"
            className="form-control m-2"
            onChange={(date, dateString) =>
              setValues({ ...values, from: dateString })
            }
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
        )}
        {to && (
          <DatePicker
            defaultValue={moment(to, "YYYY-MM-DD")}
            placeholder="To date"
            className="form-control m-2"
            onChange={(date, dateString) =>
              setValues({ ...values, to: dateString })
            }
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
        )}
        <button className="btn btn-outline-primary mt-2">Save</button>
      </form>
    </>
  );
};

export default EditHotelForm;
