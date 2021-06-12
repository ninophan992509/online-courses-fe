import React, { useState, useEffect, useContext } from "react";
import { Container, InputGroup, Tab, Nav } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import "./auth.css";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import FaceIcon from "../../../images/face-icon.svg";
import GoogleIcon from "../../../images/google-icon.svg";
import { useQuery } from "../../../services/useQuery";
import request from "../../../configs/request";
import { authContext } from "../../../contexts/AuthContext";

const MessagePassword = ({ require }) => {
  return (
    <>
      <p>Password must contain the following:</p>
      <p className={require.lowercase ? "valid" : "invalid"}>
        A <b>lowercase</b> letter
      </p>
      <p className={require.uppercase ? "valid" : "invalid"}>
        A <b>capital (uppercase)</b> letter
      </p>
      <p className={require.number ? "valid" : "invalid"}>
        A <b>number</b>
      </p>
      <p className={require.length ? "valid" : "invalid"}>
        Minimum <b>6 characters</b>
      </p>
    </>
  );
};

const validatePassword = (password) => {
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;
  let min_length = 6;

  const checkPass = {
    lowercase: password.match(lowerCaseLetters) ? true : false,
    uppercase: password.match(upperCaseLetters) ? true : false,
    number:
      password.match(numbers) && password.match(numbers).length > 0
        ? true
        : false,
    length: password && password.length >= min_length ? true : false,
  };

  const { lowercase, uppercase, number, length } = checkPass;
  return {
    result: lowercase && uppercase && number && length,
    checkPass,
  };
};

export function Login({ _ref }) {
  const [alert, setAlert] = useState({
    type: "",
    message: null,
    input: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(authContext);
  const history = useHistory();

  const handleEmailInput = (e) => {
    const value = e ? e.target.value : email;
    setEmail(value);
    const ret = value.length > 0;

    if (!ret) {
      setAlert({
        type: "danger",
        message: "Email is required",
        input: "email",
      });
    } else {
      setAlert({
        type: "",
        message: null,
        input: "",
      });
    }

    return ret;
  };

  const handlePasswordInput = (e) => {
    const value = e ? e.target.value : password;
    setPassword(value);
    const ret = value.length > 0;

    if (!ret) {
      setAlert({
        type: "danger",
        message: "Password is required",
        input: "password",
      });
    } else {
      setAlert({
        type: "",
        message: null,
        input: "",
      });
    }

    return ret;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkPass = handlePasswordInput();
    const checkEmail = handleEmailInput();

    if (checkEmail && checkPass) {
      try {
        const res = await request({
          url: "/auth/signin",
          method: "POST",
          data: {
            email,
            password,
          },
        });

        console.log(res);

        if (res.status === 200) {
          setAuth({
            ...auth,
            user: res.data.data.userInfo,
            role: res.data.data.userInfo.type,
          });

          localStorage.setItem("accessToken", res.data.data.accessToken);
          localStorage.setItem("refreshToken", res.data.data.rfToken);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data.userInfo));

          history.push("/");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setAlert({
              type: "danger",
              message: error.response.data.message,
              input: "",
            });
          }
        }
      }
    }
  };

  return (
    <Container>
      <form className="flex-column-center py-3">
        <div className="text-logo font-larger">
          <span>Novus</span>
          {_ref && <span className="text-ref">{_ref}</span>}
        </div>
        <div className="flex-column-center w-100">
          {alert.message && (
            <div className={`alert-cs-${alert.type} mb-3 p-2 w-100`}>
              <span className={alert.type === "danger" ? "invalid" : "valid"}>
                {alert.message}
              </span>
            </div>
          )}
          <div className="wrap-form-input mb-3">
            <BiUser className="input-icon" />
            <input
              className={
                alert.input === "email"
                  ? `input-append input-cs border-cs-${alert.type}`
                  : `input-append input-cs`
              }
              type="text"
              placeholder="Your email"
              onChange={(e) => handleEmailInput(e)}
            />
          </div>
          <div className="wrap-form-input mb-3">
            <RiLockPasswordLine className="input-icon" />
            <input
              className={
                alert.input === "password"
                  ? `input-append input-cs border-cs-${alert.type}`
                  : `input-append input-cs`
              }
              type="password"
              placeholder="Your password"
              onChange={(e) => handlePasswordInput(e)}
            />
          </div>
          <div className="flex-between-center w-100 my-3">
            <InputGroup className="input-check">
              <InputGroup.Checkbox aria-label="Remember me" />
              <InputGroup.Text>Remember me</InputGroup.Text>
            </InputGroup>
            <Link className="forgot-link" to="/">
              Forgot password?
            </Link>
          </div>
          <div className="mt-2">
            <button
              className="btn-cs btn-primary-cs"
              onClick={(e) => handleSubmit(e)}
            >
              {" "}
              Log In
            </button>
          </div>
        </div>
      </form>
      {_ref !== "admin" && (
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
      )}
    </Container>
  );
}

export function Register({ _ref }) {
  const [alert, setAlert] = useState({
    type: "",
    message: null,
    input: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [require, setRequire] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    length: false,
  });

  const handleEmailInput = (e) => {
    const value = e ? e.target.value : email;
    setEmail(value);

    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const ret = re.test(value);
    if (!ret) {
      setAlert({
        type: "danger",
        message: value.length > 0 ? "Email is invalid" : "Email is required",
        input: "email",
      });
    } else {
      setAlert({
        type: "",
        message: null,
        input: "",
      });
    }

    return ret;
  };

  const handlePasswordInput = (e) => {
    const value = e ? e.target.value : password;
    setPassword(value);

    if (!value) {
      setAlert({
        type: "danger",
        message: "Password is required",
        input: "password",
      });
      return false;
    } else {
      const ret = validatePassword(value);
      setRequire(ret.checkPass);

      if (!ret.result) {
        setAlert({
          type: "danger",
          message: <MessagePassword require={require} />,
          input: "password",
        });
      } else {
        setAlert({
          type: "",
          message: null,
          input: "",
        });
      }

      return ret.result;
    }
  };

  const handleNameInput = (e) => {
    const value = e ? e.target.value : name;
    setName(value);
    const re =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const ret = re.test(value);
    if (!ret) {
      setAlert({
        type: "danger",
        message: value.length > 0 ? "Name is invalid" : "Name is required",
        input: "name",
      });
    } else {
      setAlert({
        type: "",
        message: null,
        input: "",
      });
    }

    return ret;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkPass = handlePasswordInput();
    const checkEmail = handleEmailInput();
    const checkName = handleNameInput();

    if (checkEmail && checkPass && checkName) {
      const data = {
        password,
        email,
        fullname: name,
      };

      try {
        const res = await request({
          url: "/auth/register",
          method: "POST",
          data,
        });

        if (res.status === 201) {
          setAlert({
            type: "success",
            message: "Register successfully",
            input: "",
          });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setAlert({
              type: "danger",
              message: error.response.data.message,
              input: "",
            });
          }
        }
      }
    }
  };

  return (
    <Container>
      <form className="flex-column-center py-3">
        <div className="text-logo font-larger">
          {" "}
          <span>Novus</span>
          {_ref && <span className="text-ref">{_ref}</span>}
        </div>
        <div className="flex-column-center w-100">
          {alert.message && (
            <div className={`alert-cs-${alert.type} mb-3 p-2 w-100`}>
              <span className={alert.type === "danger" ? "invalid" : "valid"}>
                {alert.message}
              </span>
            </div>
          )}
          <div className="wrap-form-input mb-3">
            <BiUser className="input-icon" />
            <input
              className={
                alert.input === "name"
                  ? `input-append input-cs border-cs-${alert.type}`
                  : `input-append input-cs`
              }
              type="text"
              placeholder="Your name"
              onChange={(e) => handleNameInput(e)}
            />
          </div>
          <div className="wrap-form-input mb-3">
            <HiOutlineMail className="input-icon" />
            <input
              className={
                alert.input === "email"
                  ? `input-append input-cs border-cs-${alert.type}`
                  : `input-append input-cs`
              }
              type="text"
              placeholder="Your email"
              onChange={(e) => handleEmailInput(e)}
            />
          </div>
          <div className="wrap-form-input mb-3">
            <RiLockPasswordLine className="input-icon" />
            <input
              className={
                alert.input === "password"
                  ? `input-append input-cs border-cs-${alert.type}`
                  : `input-append input-cs`
              }
              type="password"
              placeholder="Your password"
              onChange={(e) => handlePasswordInput(e)}
            />
          </div>
          <div className="mt-2">
            <button
              className="btn-cs btn-primary-cs"
              onClick={(e) => handleSubmit(e)}
            >
              Create account
            </button>
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
  const query = useQuery();
  const _ref = query.get("_ref");

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
            {_ref === "student" && (
              <Nav.Item className="col-6 nav-tab">
                <Nav.Link className="tab-sg" eventKey="signup">
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Login _ref={_ref} />
            </Tab.Pane>
            <Tab.Pane eventKey="signup">
              <Register _ref={_ref} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </Container>
  );
};

export default Auth;
