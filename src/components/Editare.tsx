import React, { useEffect, useState } from "react";
import { RouteComponentProps, useLocation, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Col, Row } from "reactstrap";
import { getCar, updateCar, addCar, deleteCar } from "../actions/cars";
var DatePicker = require("reactstrap-date-picker");

const Editare = (props: any) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState<any | null>(null);
  const [type, setType] = useState<any | null>(null);
  const [registration, setRegistration] = useState<any | null>(null);
  const [itpDate, setItpDate] = useState<any | null>(null);
  const [cascoDate, setCascoDate] = useState<any | null>(null);
  const [revisionDate, setRevisionDate] = useState<any | "">("2022-10-10");
  const [vignetteDate, setVignetteDate] = useState<any | "">("2022-10-10");
  const [rcaDate, setRcaDate] = useState<any | "">("2022-10-10");
  const [cars, setCars] = useState([]);

  const carId = localStorage.getItem("carId");
  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
    carId
      ? updateCar(
          carId,
          make,
          model,
          type,
          registration,
          itpDate,
          cascoDate
        ).then((resp: any) => {
          history.push("/tabel");
        })
      : addCar(
          make,
          model,
          registration,
          type,
          itpDate,
          rcaDate,
          vignetteDate,
          cascoDate,
          revisionDate
        ).then((resp: any) => {
          history.push("/tabel");
        });
  };

  useEffect(() => {
    if (carId) {
      getCar(carId).then((resp) => {
        let {
          make,
          model,
          registration,
          type,
          itpDate,
          rcaDate,
          vignetteDate,
          cascoDate,
          revisionDate,
        } = resp.data;
        setMake(make);
        setModel(model);
        setType(type);
        setRegistration(registration);
        setItpDate(itpDate);
        setCascoDate(cascoDate);
        setRcaDate(rcaDate);
      });
    }
  }, [carId]);

  const deleteObj = () => {
    deleteCar(carId).then((resp) => {
      history.push("/tabel");
    });
  };

  return (
    <>
      <h2> {carId ? "Editare Masina" : "Adaugare Masina"}</h2>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="make">Marca masina</Label>
          <Input
            type="text"
            name="make"
            onChange={(e) => setMake(e.target.value)}
            value={make}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="model">Model</Label>
          <Input
            type="text"
            name="model"
            onChange={(e) => setModel(e.target.value)}
            value={model}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="carType">Tip autovehicul</Label>
          <Input
            type="select"
            name="carType"
            placeholder="Masina"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="" selected disabled hidden>
              Choose here
            </option>

            <option>Autoturism</option>
            <option>Autoutilitar</option>
            <option>Agro</option>
            <option>Camion</option>
            <option>Motocicleta</option>
            <option>Remorca</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="registration">Numar de inmatriculare</Label>
          <Input
            type="text"
            name="registration"
            id="date"
            placeholder="BC 07 CSS"
            onChange={(e) => setRegistration(e.target.value)}
            value={registration}
          />
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Label for="itp"> Data expirare ITP</Label>
              <DatePicker
                name="itpDate"
                id="date"
                dateFormat="DD/MM/YYYY"
                value={itpDate}
                onChange={(e: any) => setItpDate(e.split("T")[0])}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="casco"> Data expirare Casco</Label>
              <DatePicker
                name="cascoDate"
                id="date"
                dateFormat="DD/MM/YYYY"
                value={cascoDate}
                onChange={(e: any) => setCascoDate(e.split("T")[0])}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="service">Data Expirare Revizie</Label>
              <DatePicker
                name="revisionDate"
                id="date"
                dateFormat="DD/MM/YYYY"
                value={revisionDate}
                onChange={(e: any) => setRevisionDate(e.split("T")[0])}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="service">Data Expirare Vignieta</Label>
              <DatePicker
                name="vignetteDate"
                id="date"
                dateFormat="DD/MM/YYYY"
                value={vignetteDate}
                onChange={(e: any) => setVignetteDate(e.split("T")[0])}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="itp">Anvelope vara</Label>
              <Input type="date" name="summerTyres" id="date" />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="itp">Anvelope iarna</Label>
              <DatePicker id="example-datepicker" dateFormat="DD/MM/YYYY" />
            </FormGroup>
          </Col>
        </Row>

        {carId ? (
          <Col className="mt-5">
            <Button type="submit" color="primary">
              Salvare Masina
            </Button>
            <Button color="danger" onClick={() => deleteObj()}>
              Sterge Masina
            </Button>
          </Col>
        ) : (
          <Col>
            <Button type="submit" color="primary">
              Adaugare Masina
            </Button>
          </Col>
        )}
      </Form>
    </>
  );
};

export default Editare;
