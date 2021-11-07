import React, { useState, useEffect } from "react";
import { Form, Input } from "reactstrap";

const handleSubmit = () => {
  console.log("reset password");
};
export const Forgot = () => {
  return (
    <div className="card card-container">
      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <h4>Resetare parola</h4>
          <label htmlFor="usernameOrEmail"> Adresa de email </label>
          <Input type="email" className="form-control" name="email" required />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block mt-1">
            <span> Trimite email </span>
          </button>
        </div>
      </Form>
    </div>
  );
};
