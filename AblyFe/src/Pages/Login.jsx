import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faUser, faPhone } from "@fortawesome/free-solid-svg-icons";

import grape from "../assets/test.png";
import "./Login.css";

const Login = () => {
  const [activeHeading, setActiveHeading] = useState("Login");

  const handleHeadingClick = (heading) => {
    setActiveHeading(heading);
  };

  return (
    <>
      <div className="circle-up">
        <div className="circle-1">
          <div className="circle-2">
            <div className="circle-3"></div>
          </div>
        </div>
      </div>
      <div className="circle-down">
        <div className="circle-1">
          <div className="circle-2">
            <div className="circle-3"></div>
          </div>
        </div>
      </div>
      <div className="custom-login-container d-flex">
        <div className="left-side-container d-flex justify-content-center align-items-center">
          <div className="login-form-wrapper">
            <div className="wrapper-up mx-4 d-flex gap-5 justify-content-center align-items-center">
              <h2
                className={`text-center mb-4 ${
                  activeHeading === "Login" ? "active-heading" : ""
                }`}
                onClick={() => handleHeadingClick("Login")}
              >
                Login
                <div
                  className={`mt-1 bar ${
                    activeHeading === "Login" ? "active-bar" : ""
                  }`}
                ></div>
              </h2>
              <h2
                className={`text-center mb-4 ${
                  activeHeading === "Sign Up" ? "active-heading" : ""
                }`}
                onClick={() => handleHeadingClick("Sign Up")}
              >
                Sign up
                <div
                  className={`mt-1 bar ${
                    activeHeading === "Sign Up" ? "active-bar" : ""
                  }`}
                ></div>
              </h2>
            </div>
            <div
              className={`wrapper-down mx-4 ${
                activeHeading === "Sign Up" ? "mt-3" : "mt-4"
              }`}
            >
              <Form>
                <Form.Group className="position-relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      color: "#73cfc0",
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      paddingLeft: "10px",
                    }}
                  />
                  <Form.Control
                    type="email"
                    placeholder="email or phone no"
                    className="custom-form-control"
                    style={{ paddingLeft: "60px", borderRadius: "20px" }}
                  />
                </Form.Group>
                {activeHeading === "Sign Up" && (
                  <Form.Group className="position-relative mt-4">
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{
                        color: "#73cfc0",
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        paddingLeft: "10px",
                      }}
                    />
                    <Form.Control
                      type="tel"
                      placeholder="+91 99999 99999"
                      className="custom-form-control"
                      style={{
                        paddingLeft: "60px",
                        borderRadius: "20px",
                      }}
                    />
                  </Form.Group>
                )}
                <Form.Group className="position-relative mt-4">
                  <FontAwesomeIcon
                    icon={faUnlock}
                    style={{
                      color: "#73cfc0",
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      paddingLeft: "10px",
                    }}
                  />
                  <Form.Control
                    type="password"
                    placeholder="password"
                    className="custom-form-control"
                    style={{ paddingLeft: "60px", borderRadius: "20px" }}
                  />
                </Form.Group>
                <div className="mt-5 forgot-password d-flex align-items-center justify-content-between">
                  <a href="/forgot-password">Forgot Password?</a>
                  <Button
                    as="input"
                    type="submit"
                    value="Login"
                    style={{
                      backgroundColor: "var(--first-color)",
                      width: "100px",
                      borderRadius: "20px",
                      color: "white",
                      border: "none",
                    }}
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="right-side-container">
          <div className="circle-1">
            <div className="circle-2">
              <div className="circle-3">
                <img src={grape} alt="Grape" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
