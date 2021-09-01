import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

import EditLogo from "../img/edit.svg";
import BillLogo from "../img/files.svg";
import CarLogo from "../img/sedan-car-model.svg";
import { getCars } from "../actions/cars";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import Editare from "./Editare";

export default function Tabel() {
  const authToken = localStorage.getItem("token");
  const history = useHistory();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars().then((data) => {
      console.log(data.data);
      setCars(data.data);
    });
  }, [authToken]);

  //   const cars = data;
  // })
  // .catch((e) => {
  //   console.log(e);
  // });

  // const handleEdit = (e: any) => {
  //   console.log(e);
  //   history.push("/Editare");
  // };

  const setData = (e: any) => {
    localStorage.setItem("carId", e.id);
    history.push("/Editare");
  };

  const addCar = () => {
    localStorage.setItem("carId", "");
    history.push("/Editare");
  };

  return (
    <>
      <h2>Lista Masini</h2>
      <Button color="primary" onClick={() => addCar()}>
        {" "}
        Adaugare Masina
      </Button>
      <table className="table">
        <tbody>
          {cars.map((el: any, i: number) => (
            <Row>
              <Col sm="2">
                <div className="carName">
                  {el.make} {el.model}
                </div>
              </Col>
              <Col sm="2">
                <div className="carName">{el.registrationNumber}</div>
              </Col>

              <Col sm="4">
                <span className="importantDate"> ITP : {el.itp}</span>
                <span className="importantDate">
                  ROVIGNIETA : {el.rovinieta}
                </span>

                <span className="importantDate">
                  CASCO : {el.casco ? el.casco : "-"}
                </span>
              </Col>
              <Col>
                <td>{el.revizie}</td>
                <td>{el.anvelopeVara}</td>
                <td>{el.anvelopeIarna}</td>
              </Col>
              <Col>
                <img
                  className="editLogo"
                  alt="Edit Logo "
                  src={EditLogo}
                  onClick={() => setData(el)}
                />

                <a href="/facturi">
                  <img
                    className="fileLogo"
                    alt="Facturi Logo "
                    src={BillLogo}
                  />
                </a>
              </Col>
            </Row>
          ))}
        </tbody>
      </table>
    </>
  );
}
