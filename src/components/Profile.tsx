import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Input } from "reactstrap";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const form = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  const handleEdit = (e: any) => {
    e.preventDefault();
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
              <label htmlFor="password"> Parola </label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
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
