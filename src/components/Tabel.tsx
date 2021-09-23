import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Row,
  UncontrolledCollapse,
  CardBody,
  Card,
} from "reactstrap";

import EditLogo from "../img/edit.svg";
import BillLogo from "../img/files.svg";
import Autoturism from "../img/sedan-car-model.svg";
import Autoutilitar from "../img/suv-logo.svg";
import Agro from "../img/tractor.svg";
import Camion from "../img/cargo-truck.svg";
import Motocicleta from "../img/bike.svg";
import Remorca from "../img/trailer.svg";
import { getCars } from "../actions/cars";
import { useDispatch } from "react-redux";

export default function Tabel() {
  const authToken = localStorage.getItem("token");
  const history = useHistory();
  const [cars, setCars] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getCars().then((data) => {
      console.log(data.data);
      setCars(data.data);
    });
  }, [authToken]);

  const setData = (e: any) => {
    localStorage.setItem("carId", e.id);
    history.push("/Editare");
  };

  const setBill = (el: any) => {
    const bills = el.bills;
    localStorage.setItem("carId", el.id);
    dispatch({ type: "BILL_SUCCESS", payload: bills });
    history.push("/Facturi");
  };

  const addCar = () => {
    localStorage.setItem("carId", "");
    history.push("/Editare");
  };

  const getCarImg = (type: any) => {
    if (!type) {
      return Autoturism;
    }
    return type;
  };

  return (
    <Container>
      <Row>
        <Col className="text-left mb-5">
          <h2>Lista Masini</h2>
        </Col>
        <Col>
          <Button color="primary" onClick={() => addCar()}>
            Adaugare Masina
          </Button>
        </Col>
      </Row>

      {cars.map((el: any, i: number) => (
        <Row className="tableRow" key={i} id={"toggler" + i}>
          <Col sm="1">
            <img className="carLogo" alt="car Logo " src={getCarImg(el.type)} />
          </Col>
          <Col sm="2">
            <h4>
              {el.make} {el.model}
            </h4>
          </Col>
          <Col sm="2">
            <div className="carName">{el.registration}</div>
          </Col>

          <Col sm="3">
            <span className="importantDate"> ITP : {el.itp}</span>
            <span className="importantDate">VIGNIETA : {el.rovinieta}</span>
          </Col>
          <Col sm="3">
            <span className="importantDate">
              CASCO : {el.casco ? el.casco : "-"}
            </span>
            <span className="importantDate">Revizie : {el.revizie}</span>
          </Col>
          <Col sm="1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </Col>
          <UncontrolledCollapse toggler={"#toggler" + i}>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <p>Anvelope vara:</p>
                    <p> Anvelope iarna </p>
                  </Col>
                  <Col>
                    <p>Distributie</p>
                    <p>Frane</p>
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
                        onClick={() => setBill(el)}
                      />
                    </a>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
        </Row>
      ))}
    </Container>
  );
}
