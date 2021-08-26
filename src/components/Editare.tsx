import React from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";

export default function Editare() {
  const handleSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <h2>Adaugare Masina</h2>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="carMake">Marca masina</Label>
          <Input type="text" name="carMake" placeholder="Audi" />
        </FormGroup>
        <FormGroup>
          <Label for="carModel">Model</Label>
          <Input type="text" name="carModel" placeholder="A3" />
        </FormGroup>
        <FormGroup>
          <Label for="carType">Tip autovehicul</Label>
          <Input type="select" name="carType" placeholder="Masina">
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
          />
        </FormGroup>
        <FormGroup>
          <Label for="itp">ITP</Label>
          <Input type="date" name="itpDate" id="date" />
        </FormGroup>
        <FormGroup>
          <Label for="casco">Casco</Label>
          <Input type="date" name="cascoDate" id="date" />
        </FormGroup>
        <FormGroup>
          <Label for="service">Data Revizie</Label>
          <Input type="date" name="serviceDate" id="date" />
        </FormGroup>
        <FormGroup>
          <Label for="itp">Anvelope vara</Label>
          <Input type="date" name="summerTyres" id="date" />
        </FormGroup>
        <FormGroup>
          <Label for="itp">Anvelope iarna</Label>
          <Input type="date" name="winterTyres" id="date" />
        </FormGroup>
        <Col className="mt-5">
          <Button type="submit" color="primary">
            Adaugare Masina
          </Button>
        </Col>
      </Form>
    </>
  );
}
