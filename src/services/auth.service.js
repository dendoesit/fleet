import axios from "axios";

const API_URL = "http://fleet-dd.herokuapp.com/fleet/api/auth/";
const smsNotification = true;
const emailNotification = true;

const register = (username, email, password, phoneNumber) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    phoneNumber,
    smsNotification,
    emailNotification,
  });
};

const login = (usernameOrEmail, password) => {
  return axios
    .post(API_URL + "signin", {
      usernameOrEmail,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userId", response.data.user.id);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};
