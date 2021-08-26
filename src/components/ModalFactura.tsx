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

  const deleteBill = (id: any) => alert("Are you sure ?");

  useEffect(() => {
    console.log(localStorage.getItem("Date"));
    setID(localStorage.getItem("ID"));
    setDate(localStorage.getItem("Date"));
    setServiceName(localStorage.getItem("Service Name"));
    setServiceProvided(localStorage.getItem("Service Provided"));
    setPrice(localStorage.getItem("Price"));
  }, []);

  const handleInputFieldChange = (e: any) => {};

  return (
    <Form>
      <ModalBody>
        <FormGroup>
          <Label for="date">Data</Label>
          <Input
            type="number"
            name="date"
            id="date"
            placeholder="22.01.2020"
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
            placeholder="Diverse"
            onChange={(e) => setServiceName(e.target.value)}
            value={serviceProvided}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Price">Pret total</Label>
          <Input
            type="number"
            name="Price"
            id="Price"
            placeholder="540"
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
          <Button type="submit" color="danger" onClick={() => deleteBill(id)}>
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
