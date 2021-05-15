import React, { useState, useContext } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  ListGroup,
  InputGroup,
  Container,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import "./header.css";
import { authContext } from "../../../contexts/AuthContext";

const subCategories = [
  {
    id: 1,
    name: "Lập trình web",
  },
  {
    id: 2,
    name: "Lập trình web 2",
  },
  {
    id: 3,
    name: "Lập trình web 3",
  },
];

const subCategories1 = [
  {
    id: 1,
    name: "Lập trình di động",
  },
  {
    id: 2,
    name: "Lập trình di động 2",
  },
  {
    id: 3,
    name: "Lập trình di động 3",
  },
];

const categories = [
  {
    id: 1,
    name: "Lập trình web",
    categories: subCategories,
  },
  {
    id: 2,
    name: "Lập trình di động",
    categories: subCategories1,
  },
  {
    id: 3,
    name: "Lập trình",
    categories: subCategories,
  },
];

const CategoryList = ({ cats, handleHoverItem, variant }) => {
  return (
    <ListGroup as="ul" className="list-category">
      {cats &&
        cats.length > 0 &&
        cats.map((cat, index) => {
          return (
            <ListGroup.Item
              as="a"
              className={`dropdown-item ${variant}`}
              value={cat.id}
              key={index}
              onMouseEnter={
                handleHoverItem
                  ? () => handleHoverItem(cat.id)
                  : () => {
                      return null;
                    }
              }
            >
              <span className="item-text">{cat.name}</span>
              <span className="arrow-text"></span>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
};

function Header() {
  const [cats, setCats] = useState(categories);
  const [subCats, setSubCats] = useState(null);
  const { auth } = useContext(authContext);
  const { user, role, cart } = auth;

  const handleHoverItem = (id) => {
    if (cats && cats.length > 0) {
      const fCat = cats.find((cat) => cat.id === id);
      setSubCats(fCat.categories);
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar-app"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="#home" className="text-logo">
            <span>{"Novus"}</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="res-navbar-nav" />
          <Navbar.Collapse id="res-navbar-nav" as="div">
            {role !== "teacher" && role !== "admin" && (
              <>
                <Nav className="left">
                  <NavDropdown
                    title="Categories"
                    id="nav-dropdown"
                    className="dropdown-category"
                  >
                    <NavDropdown.Item as="div" className="dropdown-wrap-list">
                      <CategoryList
                        cats={cats}
                        handleHoverItem={handleHoverItem}
                        variant="primary"
                      />{" "}
                      <CategoryList cats={subCats} variant="secondary" />
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <InputGroup className="input-group-search">
                  <button className="input-group-prepend">
                    <BsSearch />
                  </button>
                  <input
                    aria-label="search"
                    aria-describedby="search"
                    type="text"
                    className="input-form-search form-control"
                    placeholder="Search"
                  />
                </InputGroup>
              </>
            )}

            <Nav className="right">
              {role !== "teacher" && role !== "admin" && (
                <div className="wrap-cart">
                  <span className="cart-number">{cart ? cart.length : 0}</span>
                  <button>
                    <GiShoppingCart />
                  </button>
                </div>
              )}

              {!user && (
                <>
                  <Link className="nav-link-right flex-center">
                    For Teacher
                  </Link>
                  <button className="btn-cs btn-primary-cs btn-login">
                    Log In / Sign Up
                  </button>
                </>
              )}

              {user && (
                <Dropdown className="dropdown-profile">
                  <Dropdown.Toggle>
                    <FiUser />
                    {user.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                    {role === "student" && (
                      <>
                      <Link className="dropdown-item" to="/watch-list">
                        Watch List
                      </Link> 
                      <Link className="dropdown-item" to="/student-courses">
                          My Courses
                      </Link>
                        </>
                    )}
                    <Link className="dropdown-item" to="/logout">
                      Log Out
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
