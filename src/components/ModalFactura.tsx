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
  toggle?: any;
}

const ModalFactura = (props: ModalFacturaProps) => {
  const [date, setDate] = useState<any | null>(null);
  const [validUntil, setValidUntil] = useState<any | null>(null);
  const [provider, setProvider] = useState<any | null>(null);
  const [description, setDescription] = useState<any | null>(null);
  const [price, setPrice] = useState<any | null>(null);
  const [customFile, setCustomFile] = useState<any | null>(null);
  const [id, setID] = useState<any | null>(null);
  const [type, setType] = useState<any | null>(null);

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
    setProvider(localStorage.getItem("Provider"));
    setDescription(localStorage.getItem("Description"));
    setPrice(localStorage.getItem("Price"));
    setType(localStorage.getItem("Type"));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addBill(
      provider,
      description,
      date.toString(),
      type,
      price,
      "2020-09-09"
    ).then((resp: any) => {
      window.location.reload();
    });
  };
  // const handleInputFieldChange = (e: any) => {};

  return (
    <Form onSubmit={handleSubmit}>
      <ModalBody>
        <FormGroup>
          <Label for="date">Data Factura</Label>
          <Input
            type="date"
            name="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </FormGroup>
        <FormGroup>
          <Label for="provider">Numele Service</Label>
          <Input
            type="text"
            name="provider"
            id="provider"
            onChange={(e) => setProvider(e.target.value)}
            value={provider}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Descriere Reparatie</Label>
          <Input
            type="text"
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </FormGroup>
        <FormGroup>
          <Label for="carType">Tip factura</Label>
          <Input
            type="select"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            placeholder="Tip Factura"
            defaultValue={type}
          >
            <option value="1" selected disabled hidden>
              Alege tipul facturii
            </option>
            <option value="RCA">RCA</option>
            <option value="ITP">ITP</option>
            <option value="CASCO">CASCO</option>
            <option>Revizie</option>
            <option>Service</option>
            <option>Altele</option>
          </Input>
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
        {/* <FormGroup>
          <Label for="date">Data expirare factura</Label>
          <Input
            type="date"
            name="validUntil"
            id="validUntil"
            onChange={(e) => setValidUntil(e.target.value)}
            value={validUntil}
          />
        </FormGroup> */}
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
