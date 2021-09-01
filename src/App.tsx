import React, { useState, useEffect } from "react";
import {
  DefaultRootState,
  RootStateOrAny,
  useDispatch,
  useSelector,
} from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Tabel from "./components/Tabel";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Editare from "./components/Editare";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const authToken = localStorage.getItem("user");
  console.log(authToken);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (currentUser) {
  //     setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
  //     setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
  //   }
  // }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tabel"} className="nav-link">
                Home
              </Link>
            </li>
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board{" "}
                </Link>{" "}
              </li>
            )}
            {authToken && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profil
                </Link>
              </li>
            )}{" "}
          </div>
          {authToken ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>{" "}
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}{" "}
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />{" "}
            <Route exact path="/register" component={Register} />{" "}
            <Route exact path="/profile" component={Profile} />{" "}
            <Route path="/tabel" component={Tabel} />{" "}
            <Route path="/editare" component={Editare} />{" "}
          </Switch>{" "}
        </div>{" "}
      </div>{" "}
    </Router>
  );
};

export default App;
