import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Acest camp este obligatoriu.
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Emailul nu este valid.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Numele de utilizator trebuie sa contina minim 3 caractere.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Parola trebuie sa contina minim 6 caractere
      </div>
    );
  }
};

const validPhone = (value) => {
  if (value.length < 9 || value.length > 9) {
    return (
      <div className="alert alert-danger" role="alert">
        Numarul de telefon nu poate avea mai mult sau mai putin de 9 caractere.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangePhone = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password, phoneNumber, true, true))
        .then(() => {
          props.history.push("/login");
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username"> Nume utilizator </label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Parola </label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"> Email </label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone"> Numar telefon </label>
                <Input
                  type="number"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangePhone}
                  validations={[validPhone]}
                  placeholder="0724456789"
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Inregistrare
                </button>
              </div>
            </div>
          )}
          <CheckButton
            style={{
              display: "none",
            }}
            ref={checkBtn}
          />
        </Form>
      </div>
    </div>
  );
};

export default Register;
