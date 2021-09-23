import axios from "axios";
const API_URL = "http://fleet-dd.herokuapp.com/fleet/api/";

const auth = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${auth}` },
};

const payload = {};

export const getCars = () => {
  return axios.get(API_URL + "car", config);
};

export const getCar = (carId) => {
  return axios.get(API_URL + "car/" + carId, config);
};

export const addCar = (
  make,
  model,
  type,
  registration,
  itpDate,
  cascoDate,
  revisionDate,
  serviceDate
) => {
  console.log(type);
  return axios.post(
    API_URL + "car",
    {
      make,
      model,
      type,
      registration,
      itpDate,
      cascoDate,
      revisionDate,
      serviceDate,
    },
    config
  );
};

export const updateCar = (
  carId,
  make,
  model,
  type,
  registration,
  itpDate,
  cascoDate,
  revisionDate
) => {
  return axios.put(
    API_URL + "car/" + carId,
    {
      make,
      model,
      type,
      registration,
      itpDate,
      cascoDate,
      revisionDate,
    },
    config
  );
};

export const deleteCar = (carId) => {
  return axios.delete(API_URL + "car/" + carId, config);
};
