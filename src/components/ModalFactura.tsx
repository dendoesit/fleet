import React, { useEffect, useState } from "react";
import {
  Form,
  ModalBody,
  FormGroup,
  Label,
  CustomInput,
  Input,
  ModalFooter,
  Button,
  Col,
} from "reactstrap";
import { addBill, updateBill, deleteBill } from "../actions/bills";

interface ModalFacturaProps {
  data?: any;
  id?: any;
  serviceName?: any;
  serviceProvided?: any;
  price?: any;
}

const ModalFactura = (props: ModalFacturaProps) => {
  const [date, setDate] = useState<any | null>(null);
  const [serviceName, setServiceName] = useState<any | null>(null);
  const [serviceProvided, setServiceProvided] = useState<any | null>(null);
  const [price, setPrice] = useState<any | null>(null);
  const [customFile, setCustomFile] = useState<any | null>(null);
  const [id, setID] = useState<any | null>(null);

  console.log(props);

  const handleInputChange = (e: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.currentTarget.files[0]);
    console.log(reader);
    console.log(e.currentTarget.files[0]);
  };

  const removeBill = (id: any) => {
    alert("Are you sure ?");
    deleteBill(id);
  };

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setDate(localStorage.getItem("Date"));
    setServiceName(localStorage.getItem("Service Name"));
    setServiceProvided(localStorage.getItem("Service Provided"));
    setPrice(localStorage.getItem("Price"));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addBill(serviceName, serviceProvided, date).then((resp: any) => {});
  };
  // const handleInputFieldChange = (e: any) => {};

  return (
    <Form onSubmit={handleSubmit}>
      <ModalBody>
        <FormGroup>
          <Label for="date">Data</Label>
          <Input
            type="date"
            name="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ServiceName">Numele Service</Label>
          <Input
            type="text"
            name="ServiceName"
            id="ServiceName"
            onChange={(e) => setServiceName(e.target.value)}
            value={serviceName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ServiceProvided">Descriere Reparatie</Label>
          <Input
            type="text"
            name="ServiceProvided"
            id="ServiceProvided"
            onChange={(e) => setServiceProvided(e.target.value)}
            value={serviceProvided}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Price">Pret total</Label>
          <Input
            type="number"
            name="Price"
            id="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </FormGroup>
        <FormGroup>
          <Label for="addFile">Adauga Fisier</Label>
          <CustomInput
            type="file"
            id="addFile"
            name="customFile"
            onChange={handleInputChange}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Col>
          <Button type="submit" color="danger" onClick={() => removeBill(id)}>
            Stergere Factura
          </Button>
        </Col>
        <Col sm={2}>
          <Button type="submit" color="primary">
            Salvare
          </Button>
        </Col>
      </ModalFooter>
    </Form>
  );
};

export default ModalFactura;
