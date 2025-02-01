import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as identityService from "../services/IdentityService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUser((prevState) => {
      let currentName = e.target.name;
      let currentValue = e.target.value;

      return {
        ...prevState,
        [currentName]: currentValue,
      };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    identityService.register(user).then(() => {
      navigate(`/login`);
    });
  };
  const formWrapperStyles = `d-flex flex-column justify-content-center align-items-center`;

  return (
    <Row style={{ width: "100%", height: "100%", position:"absolute" }}>
      <div className={formWrapperStyles}>
        <div className="bg-light rounded shadow p-3">
          <h1 className="pb-2 text-success">Register</h1>
          <div>
            <Form onSubmit={onFormSubmit}>
              <Form.Group className="form-group mb-3" controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  placeholder="Email"
                  onChange={onInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-3" controlId="password">
                <Form.Control
                  type="password"
                  name="password"
                  defaultValue={user.password}
                  placeholder="Password"
                  onChange={onInputChange}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Register
              </Button>
              <Form.Group>
                <p className="d-flex justify-content-center gap-1 m-0 mt-2">
                  <span>You have account?</span>
                  <Link className="nav-link text-success" to="/login">
                    <u>Login</u>
                  </Link>
                </p>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </Row>
  );
}