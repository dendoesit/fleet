import { useEffect, useState } from "react";

import { Col, Row, Button, Modal, ModalHeader, Container } from "reactstrap";
import ModalFactura from "./ModalFactura";
import BillLogo from "../img/files.svg";
import EditLogo from "../img/edit.svg";
import DeleteLogo from "../img/trash.svg";
import moment from "moment";
import axios from "axios";
import { getBills } from "../actions/bills";

const Facturi = () => {
  const [modal, setModal] = useState(false);
  const [bills, setBills] = useState<any | []>([]);

  useEffect(() => {
    getBills().then((data) => {
      setBills(data.data);
    });
  }, []);

  const toggle = () => setModal(!modal);
  const setData = (data: any) => {
    toggle();
    let { id, date, provider, description, price, type } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Date", date);
    localStorage.setItem("Provider", provider);
    localStorage.setItem("Description", description);
    localStorage.setItem("Price", price);
    localStorage.setItem("Type", type);
  };
  const test = Object.entries(bills).map((item: any) => {
    console.log(bills);
  });

  const years = Object.keys(bills);

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
        <ModalFactura toggle={toggle} />
      </Modal>
      <div className="tablehead">
        <b> </b>
        <p>Data</p>
        <p> Service</p>
        <p>Descriere</p>
        <p> Tip factura</p>
        <p>Pret</p>
        <p> Editare</p>
      </div>
      <hr></hr>

      {Object.entries(bills).map((item: any) =>
        item[1].map((el: any, i: number) => (
          <>
            {i < 1 && item[0]}
            <div key={i} className="billRow">
              <img className="fileLogo" alt="file logo" src={BillLogo} />
              <p>{moment(new Date(el.date)).format("DD/MM/YYYY")}</p>
              <p>{el.provider}</p>
              <p> {el.description}</p>
              <p>{el.type}</p>
              <p>{el.price}</p>
              <p>
                <img
                  className="editLogo"
                  alt="Edit Logo "
                  src={EditLogo}
                  onClick={() => setData(el)}
                />
              </p>
            </div>
          </>
        ))
      )}
    </>
  );
};

export default Facturi;
