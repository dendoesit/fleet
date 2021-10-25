import React, { useState, useEffect } from "react";
import { Button, Container, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { getUser, updateUser } from "../actions/user";
import Form from "react-bootstrap/Form";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsNotification, setSmsNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);

  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    getUser().then((data: any) => {
      const user = data.data;
      console.log(data);

      if (user) {
        localStorage.setItem("userId", user.id);
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
        setPhoneNumber(user.phoneNumber);
        setSmsNotification(user.smsNotification);
        setEmailNotification(user.emailNotification);
      }
    });
  }, []);

  const history = useHistory();

  const handleEdit = (e: any) => {
    e.preventDefault();
    updateUser(
      username,
      email,
      password,
      phoneNumber,
      emailNotification,
      smsNotification
    ).then((resp: any) => {
      history.push("/tabel");
    });
  };

  return (
    <Container>
      <h2>Profil</h2>
      <Form onSubmit={handleEdit}>
        {!successful && (
          <div>
            <div className="form-group">
              <label htmlFor="username"> Nume utilizator </label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"> Parola </label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"> Email </label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone"> Numar telefon </label>
              <Input
                type="number"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e: any) => setPhoneNumber(e.target.value)}
              />
            </div>
            <br />
            <h3> Notificari </h3>
            <p>
              Notificarile sunt folosite pentru a va anunta cand se apropie
              termenul de expirare
            </p>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Notificari prin Sms"
              checked={smsNotification}
              onChange={() => setSmsNotification(!smsNotification)}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Notificari prin Email"
              checked={emailNotification}
              onChange={() => setEmailNotification(!emailNotification)}
            />
          </div>
        )}
        <Button type="submit" color="success">
          Salveaza Detaliile
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
