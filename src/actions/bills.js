import axios from "axios";
const API_URL = "http://fleet-dd.herokuapp.com/fleet/api/bill";

const auth = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${auth}` },
};

const payload = {};
const carId = localStorage.getItem("carId");

export const addBill = (provider, description, date) => {
  return axios.post(
    API_URL,
    {
      carId,
      provider,
      description,
      date,
    },
    config
  );
};

export const updateBill = (
  carId,
  make,
  model,
  type,
  registration,
  itpDate,
  cascoDate,
  revisionDate
) => {};

export const deleteBill = (billId) => {
  return axios.delete(API_URL + billId);
};
