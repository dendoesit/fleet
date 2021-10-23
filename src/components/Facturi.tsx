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

  console.log(data);
  data.sort(function (a: any, b: any) {
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
  });
  useEffect(() => {
    setAPIData(bills.bills);
  }, [bills]);

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
  let uniqueYears: any = [];
  data.map((item: any) => {
    uniqueYears.push(item.date.substring(0, 4));
  });
  uniqueYears = [...new Set(uniqueYears)].sort();

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
        <b>2020 </b>
        <p>Data</p>
        <p> Service</p>
        <p>Descriere</p>
        <p> Tip factura</p>
        <p>Pret</p>
        <p> Editare</p>
      </div>
      <hr></hr>

      {data.map((el: any, i: number) => (
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
      ))}
    </>
  );
};

export default Facturi;
