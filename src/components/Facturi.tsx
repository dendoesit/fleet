import { useEffect, useState } from "react";

import { Col, Row, Button, Modal, ModalHeader, Container } from "reactstrap";
import ModalFactura from "./ModalFactura";
import BillLogo from "../img/files.svg";
import EditLogo from "../img/edit.svg";
import DeleteLogo from "../img/trash.svg";
import moment from "moment";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../app/hooks";

const Facturi = () => {
  const [modal, setModal] = useState(false);
  const [data, setAPIData] = useState([]);
  const bills = useAppSelector((state) => state.store);

  useEffect(() => {
    setAPIData(bills.bills);
  }, [bills]);

  const toggle = () => setModal(!modal);
  const setData = (data: any) => {
    toggle();
    let { id, date, serviceName, serviceProvided, price } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Date", date);
    localStorage.setItem("Service Name", serviceName);
    localStorage.setItem("Service Provided", serviceProvided);
    localStorage.setItem("Price", price);
  };

  return (
    <>
      <h4>
        Facturi pentru <br />
        Audi A3 BC 07 CDD
      </h4>
      <Row>
        <Col>
          <Button color="primary" onClick={toggle}>
            Adauga Factura
          </Button>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Adaugare Factura</ModalHeader>
        <ModalFactura />
      </Modal>
      <Row>
        <b>2020 </b>
      </Row>
      <hr></hr>
      {data.map((el: any, i: number) => (
        <Row key={i} className="billRow">
          <Col sm="1">
            <img className="fileLogo" alt="file logo" src={BillLogo} />
          </Col>
          <Col sm="2">
            {" "}
            {moment(new Date(el.validUntil)).format("DD/MM/YYYY")}
          </Col>
          <Col sm="3"> {el.description}</Col>
          <Col sm="4"> {el.type}</Col>
          <Col> {el.price}</Col>
          <Col sm="1">
            <img
              className="editLogo"
              alt="Edit Logo "
              src={EditLogo}
              onClick={() => setData(el)}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

export default Facturi;
