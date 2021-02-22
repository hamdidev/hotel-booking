import axios from "axios";

export const createConnectAccount = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountStatus = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const getAccountBalance = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// Currency Formatter
export const currencyFormatter = (data) => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

//Payouts Settings
export const payoutSetting = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// Get Session ID

export const getSessionId = async (token, hotelId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    { hotelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// Stripe success page

export const stripeSuccessRequest = async (token, hotelId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,
    // { hotelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
