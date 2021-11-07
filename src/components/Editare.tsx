import React, { useEffect, useState } from "react";
import { RouteComponentProps, useLocation, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Col, Row } from "reactstrap";
import { getCar, updateCar, addCar, deleteCar } from "../actions/cars";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Editare = (props: any) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState<any | null>(null);
  const [type, setType] = useState<any | null>(null);
  const [registration, setRegistration] = useState<any | null>(null);
  const [itpDate, setItpDate] = useState(new Date());
  const [cascoDate, setCascoDate] = useState(new Date());
  const [revisionDate, setRevisionDate] = useState(new Date());
  const [vignetteDate, setVignetteDate] = useState(new Date());
  const [rcaDate, setRcaDate] = useState(new Date());
  const [cars, setCars] = useState([]);

  const [loading, setLoading] = useState(false);

  const carId = localStorage.getItem("carId");
  const history = useHistory();
  const convertDate = (inputFormat: any) => {
    function pad(s: any) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  };
  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
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
          convertDate(itpDate),
          convertDate(cascoDate),
          convertDate(rcaDate),
          convertDate(vignetteDate),
          convertDate(revisionDate)
        )
          .then((resp: any) => {
            setLoading(false);
            history.push("/tabel");
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
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
        setItpDate(new Date(itpDate));
        setCascoDate(new Date(cascoDate));
        setRcaDate(new Date(rcaDate));
        setVignetteDate(new Date(vignetteDate));
        setRevisionDate(new Date(revisionDate));
      });
    }
  }, [carId]);

  const deleteObj = () => {
    deleteCar(carId).then((resp) => {
      history.push("/tabel");
    });
  };

  console.log(convertDate(itpDate));

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
            placeholder="BC 07 CSS"
            onChange={(e) => setRegistration(e.target.value)}
            value={registration}
            required
          />
        </FormGroup>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="itp"> Data expirare ITP</Label>
              <DatePicker
                name="itpDate"
                id="date"
                dateFormat="dd/MM/yyyy"
                selected={itpDate}
                placeholderText="Alege o data"
                onChange={(e: any) => setItpDate(e)}
              />
            </FormGroup>
          </Col>

          <Col md="6">
            <FormGroup>
              <Label for="casco"> Data expirare Casco</Label>
              <DatePicker
                name="cascoDate"
                id="date"
                dateFormat="dd/MM/yyyy"
                selected={cascoDate}
                onChange={(e: any) => setCascoDate(e)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="service">Data Expirare Revizie</Label>
              <DatePicker
                name="revisionDate"
                id="date"
                dateFormat="dd/MM/yyyy"
                selected={revisionDate}
                onChange={(e: any) => setRevisionDate(e)}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="service">Data Expirare Vignieta</Label>
              <DatePicker
                name="vignetteDate"
                id="date"
                dateFormat="dd/MM/yyyy"
                selected={vignetteDate}
                onChange={(e: any) => setVignetteDate(e)}
              />
            </FormGroup>
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <FormGroup>
              <Label for="itp">Anvelope vara</Label>
              <Input
                type="date"
                name="summerTyres"
                id="date"
                format="dd-mm-yyyy"
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="itp">Anvelope iarna</Label>
              <Input type="date" name="summerTyres" id="date" />
            </FormGroup>
          </Col>
        </Row> */}

        {carId ? (
          <Row>
            <Col className="mt-5">
              <Button type="submit" color="primary" disabled={loading}>
                Salvare Masina
              </Button>
              <Button color="danger" onClick={() => deleteObj()}>
                Sterge Masina
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Button type="submit" color="primary" disabled={loading}>
                Adaugare Masina
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </>
  );
};

export default Editare;
