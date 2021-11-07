import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Tabel from "./components/Tabel";

import { logout } from "./actions/auth";

import { history } from "./helpers/history";
import Editare from "./components/Editare";
import Facturi from "./components/Facturi";
import User from "../src/img/user.svg";
import { Forgot } from "./components/Forgot";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const authToken = localStorage.getItem("user");
  const dispatch = useDispatch();

  console.log(authToken);

  useEffect(() => {
    history.listen((location) => {
      // dispatch(clearMessage()); // clear message when changing location
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
        <nav className="navbar navbar-dark bg-dark">
          {authToken ? (
            <div className="navbar-nav justify-content-between container">
              <li className="nav-item">
                <Link to={"/tabel"} className="nav-link">
                  Acasa
                </Link>
              </li>
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
              {authToken && (
                <li className="nav-item dropdown mr-auto">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdownMenuLink"
                  >
                    <img
                      src={User}
                      className="logo userLogo"
                      alt="User Logo"
                    ></img>
                  </a>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link to={"/profile"}>Profil</Link>
                    <a href="/login" onClick={logOut}>
                      Log Out
                    </a>
                  </div>
                </li>
              )}
            </div>
          ) : (
            <div className="navbar-nav justify-content-end">
              <li className="nav-item float-right">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Inregistrare
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return authToken ? (
                  <Redirect to="/login" />
                ) : (
                  <Redirect to="/home" />
                );
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/tabel" component={Tabel} />
            <Route path="/editare" component={Editare} />
            <Route path="/facturi" component={Facturi} />
            <Route path="/forgot" component={Forgot} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
