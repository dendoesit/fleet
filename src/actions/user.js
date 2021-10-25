import axios from "axios";
import { createImportSpecifier } from "typescript";
const API_URL = "http://fleet-dd.herokuapp.com/fleet/api/";

const auth = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${auth}` },
};
const userId = localStorage.getItem("userId");
console.log(userId);
export const getUser = () => {
  return axios.get(API_URL + "user/" + userId, config);
};
export const updateUser = (
  username,
  email,
  password,
  phoneNumber,
  emailNotification,
  smsNotification
) => {
  return axios.put(
    API_URL + "user/" + userId,
    {
      username,
      email,
      password,
      phoneNumber,
      emailNotification,
      smsNotification,
    },
    config
  );
};
