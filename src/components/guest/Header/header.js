import React, { useState } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  ListGroup,
  InputGroup,
  Container
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "./header.css";

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
            Novus
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
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
            <Nav className="right">
              <Nav.Link className="nav-link-right">For Teacher</Nav.Link>
              <button className="btn-cs btn-primary-cs">
                Log In / Sign Up
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
