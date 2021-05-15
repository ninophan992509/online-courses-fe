import React, { useState } from "react";
import { Container, InputGroup, Tab, Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./auth.css";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import FaceIcon from "../../../images/face-icon.svg";
import GoogleIcon from "../../../images/google-icon.svg";

export function Login() {
  return (
    <Container>
      <form className="flex-column-center py-3">
        <div className="text-logo font-larger">Novus</div>
        <div className="flex-column-center w-100">
          <div className="wrap-form-input mb-3">
            <BiUser className="input-icon" />
            <input
              className="input-append input-cs"
              type="text"
              placeholder="Your email"
            />
          </div>
          <div className="wrap-form-input mb-3">
            <RiLockPasswordLine className="input-icon" />
            <input
              className="input-append input-cs"
              type="password"
              placeholder="Your password"
            />
          </div>
          <div className="flex-between-center w-100 my-3">
            <InputGroup className="input-check">
              <InputGroup.Checkbox aria-label="Remember me" />
              <InputGroup.Text>Remember me</InputGroup.Text>
            </InputGroup>
            {/* <Link to="/">Forgot password?</Link>*/}
            <a className="forgot-link" href="/">
              Forgot password?
            </a>
          </div>
          <div className="mt-2">
            <button className="btn-cs btn-primary-cs"> Log In</button>
          </div>
        </div>
      </form>
      <div className="social-login">
        <div className="social-login-label">
          <span className="label-text">or login with</span>
        </div>
        <div className="flex-center w-100 social-btn">
          <button className="btn-icon btn-face">
            <img alt="facebook" src={FaceIcon} />
          </button>
          <button className="btn-icon btn-gg">
            <img alt="google" src={GoogleIcon} />
          </button>
        </div>
      </div>
    </Container>
  );
}

export function Register() {
  return (
    <Container>
      <form className="flex-column-center py-3">
        <div className="text-logo font-larger">Novus</div>
        <div className="flex-column-center w-100">
          <div className="wrap-form-input mb-3">
            <BiUser className="input-icon" />
            <input
              className="input-append input-cs"
              type="text"
              placeholder="Your name"
            />
          </div>
          <div className="wrap-form-input mb-3">
            <HiOutlineMail className="input-icon" />
            <input
              className="input-append input-cs"
              type="text"
              placeholder="Your email"
            />
          </div>
          <div className="wrap-form-input mb-3">
            <RiLockPasswordLine className="input-icon" />
            <input
              className="input-append input-cs"
              type="password"
              placeholder="Your password"
            />
          </div>
          <div className="mt-2">
            <button className="btn-cs btn-primary-cs">Create account</button>
          </div>
        </div>
      </form>
      <div className="social-login">
        <div className="social-login-label">
          <span className="label-text">or register with</span>
        </div>
        <div className="flex-center w-100 social-btn">
          <button className="btn-icon btn-face">
            <img alt="facebook" src={FaceIcon} />
          </button>
          <button className="btn-icon btn-gg">
            <img alt="google" src={GoogleIcon} />
          </button>
        </div>
      </div>
    </Container>
  );
}

const Auth = () => {
  const [key, setKey] = useState("login");
  return (
    <Container>
      <div className="box-wrapper login-form">
        <Tab.Container id="tabs-auth" defaultActiveKey="login">
          <Nav variant="pills" className="row">
            <Nav.Item className="col-6 nav-tab">
              <Nav.Link className="tab-lg" eventKey="login">
                Log In
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="col-6 nav-tab">
              <Nav.Link className="tab-sg" eventKey="signup">
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Login />
            </Tab.Pane>
            <Tab.Pane eventKey="signup">
              <Register />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </Container>
  );
};

export default Auth;
