import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Col, Row } from "reactstrap";

import EditLogo from "../img/edit.svg";
import BillLogo from "../img/files.svg";
import CarLogo from "../img/sedan-car-model.svg";

export default function Tabel() {
  const cars = [
    {
      id: 1,
      make: "audi a3",
      registrationNumber: "BC07CDD",
      itp: "01.07.2020",
      rovinieta: "15.12.2020",
      casco: "13.12.2020",
      revizie: "12.12.2020",
      anvelopeVara: "20.04.2020",
      anvelopeIarna: "19.02.2020",
    },
  ];
  const history = useHistory();

  // const handleEdit = (e: any) => {
  //   console.log(e);
  //   history.push("/Editare");
  // };

  const setData = (e: any) => {};

  return (
    <>
      <h2>Lista Masini</h2>
      <table className="table">
        <thead>
          <tr>
            {/* <th> Masina </th> <th> Nr.inmatriculare </th> <th> ITP </th>{" "}
            <th> Rovinieta </th> <th> CASCO </th> <th> Revizie </th>{" "}
            <th> Anvelope vara </th> <th> Anvelope iarna </th>
            <th>Editare</th>
            <th>Facturi</th> */}
          </tr>
        </thead>
        <tbody>
          {cars.map((el: any, i: number) => (
            <Row>
              <Col sm="2">
                <div className="carName">{el.make}</div>
              </Col>
              <Col sm="2">
                <div className="carName">{el.registrationNumber}</div>
              </Col>

              <Col sm="4">
                <span className="importantDate">ITP : {el.itp}</span>
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
                    alt="Facturi  Logo "
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
