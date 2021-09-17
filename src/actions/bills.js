import axios from "axios";
const API_URL = "http://fleet-dd.herokuapp.com/fleet/api/";

const auth = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${auth}` },
};

const payload = {};
const carId = localStorage.getItem("carId");

export const addBill = (description, type, validUntil) => {
  return axios.post(
    API_URL + "car/" + carId + "/bill",
    {
      description,
      type,
      validUntil,
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

export const deleteBill = (billId) => {};
