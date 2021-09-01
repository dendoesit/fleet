import React, { useEffect, useState } from "react";
import { RouteComponentProps, useLocation, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import { getCar, updateCar, addCar, deleteCar } from "../actions/cars";

const Editare = (props: any) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState<any | null>(null);
  const [type, setType] = useState<any | null>(null);
  const [registration, setRegistration] = useState<any | null>(null);
  const [itpDate, setItpDate] = useState<any | null>(null);
  const [cascoDate, setCascoDate] = useState<any | null>(null);
  const [serviceDate, setServiceDate] = useState<any | null>(null);
  const [cars, setCars] = useState([]);

  const carId = localStorage.getItem("carId");
  const history = useHistory();

  const handleSubmit = (e: any) => {
    console.log(make, model);
    e.preventDefault();
    carId
      ? updateCar(
          carId,
          make,
          model,
          type,
          registration,
          itpDate,
          cascoDate,
          serviceDate
        ).then((resp: any) => {
          console.log(resp);
          history.push("/tabel");
        })
      : addCar(
          make,
          model,
          type,
          registration,
          itpDate,
          cascoDate,
          serviceDate
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
          type,
          registration,
          itpDate,
          cascoDate,
          serviceDate,
        } = resp.data;
        setMake(make);
        setModel(model);
        setType(type);
        setRegistration(registration);
        setItpDate(itpDate);
        setCascoDate(cascoDate);
        setServiceDate(serviceDate);
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
            <option>Autoturisme</option>
            <option>Autoutilitare</option>
            <option>Agro</option>
            <option>Camioane</option>
            <option>Motociclete</option>
            <option>Remorci</option>
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
        <FormGroup>
          <Label for="itp"> Data expirare ITP</Label>
          <Input
            type="date"
            name="itpDate"
            id="date"
            onChange={(e) => setItpDate(e.target.value)}
            value={itpDate}
          />
        </FormGroup>
        <FormGroup>
          <Label for="casco"> Data expirare Casco</Label>
          <Input
            type="date"
            name="cascoDate"
            id="date"
            onChange={(e) => setCascoDate(e.target.value)}
            value={cascoDate}
          />
        </FormGroup>
        <FormGroup>
          <Label for="service">Data Expirare Revizie</Label>
          <Input
            type="date"
            name="serviceDate"
            id="date"
            onChange={(e) => setServiceDate(e.target.value)}
            value={serviceDate}
          />
        </FormGroup>
        <FormGroup>
          <Label for="itp">Anvelope vara</Label>
          <Input type="date" name="summerTyres" id="date" />
        </FormGroup>
        <FormGroup>
          <Label for="itp">Anvelope iarna</Label>
          <Input type="date" name="winterTyres" id="date" />
        </FormGroup>
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
