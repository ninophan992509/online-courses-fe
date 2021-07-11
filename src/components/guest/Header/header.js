import React, { useState, useContext, useRef, useCallback, useEffect } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  ListGroup,
  InputGroup,
  Container,
  Dropdown,
} from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
// import uploadFile from "../../../configs/firebaseConfig";
import "./header.css";
import { authContext } from "../../../contexts/AuthContext";
import { useLoadCategories } from "./useLoadCategories";
import { appContext } from "../../../contexts/AppContext";
import { REMOVE_ITEM_IN_CART } from "../../../constants";
import request from "../../../configs/request";


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
  const history = useHistory();
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
              onClick={() => {
                history.push(`/courses/${cat.id}`);
              }}
            >
              <span className="item-text">{cat.category_name}</span>
              <span className="arrow-text"></span>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
};

function Header() {
  // const [cats, setCats] = useState([]);
  const [subCats, setSubCats] = useState(null);
  const { auth, setAuth } = useContext(authContext);
  const { store, dispatch } = useContext(appContext);
  const { user, role } = auth;
  const [file, setFile] = useState(null);
  const [url, setURL] = useState(null);
  const [searchVal, setSearchVal] = useState('');
  const [filter, setFilter] = useState({});
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get('keyword');




  useEffect(() => {
    if (keyword)
    {
      setSearchVal(keyword);    
    }
  }, [location]);
  
  useEffect(() => {
    setFilter({ limit: 10, page: 0 });
  }, []);

  const { loading, error, cats, hasMore, pageNumber } = useLoadCategories(filter);
  const observer = useRef();
  
  const lastCategoryRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setFilter({
            ...filter,
            page: pageNumber + 1
           })
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );


  const handleHoverItem = (id) => {
    if (cats && cats.length > 0) {
      const fCat = cats.find((cat) => cat.id === id);
      setSubCats(fCat.categories);
    }
  };

  // const getURL = (_url) => {
  //   console.log(_url);
  //   setURL(_url);
  // };

  const handleLogOut = () => {
    setAuth({ ...auth, user: null, role: "guest" });
  };


  if (location.pathname === "/auth") return null;

  const removeItem = (item) => {
    dispatch({
      type: REMOVE_ITEM_IN_CART,
      payload: item,
    });  
  }


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
          {/* <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <button
            onClick={async () => {
              if (file) {
                uploadFile(file, getURL);
              }
            }}
          >
            Upload
          </button> */}
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
                  <button className="input-group-prepend" onClick={() => {
                    if (searchVal)
                      history.push(`/courses/search?keyword=${searchVal}`);
                  }}>
                    <BsSearch />
                  </button>
                  <input
                    aria-label="search"
                    type="text"
                    className="input-form-search form-control"
                    placeholder="Search"
                    value={searchVal}
                    onChange={(e)=>setSearchVal(e.target.value)}
                  />
                </InputGroup>
              </>
            )}

            <Nav className="right">
              {role !== "teacher" && role !== "admin" && (
                <Dropdown className="dropdown-profile dropdown-cart">
                  <Dropdown.Toggle className="wrap-cart">
                     <span className="cart-number">{store.carts ? store.carts.length : 0}</span>
                   <button>
                    <GiShoppingCart />
                  </button>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {store.carts && store.carts.map((c, index) => {
                      return (
                        <Dropdown.Item className="dropdown-item">
                          <div>
                            <div>{c.course_name}</div>
                            <div>{c.teacher_name}</div>
                            <div className="text-number">${c.tuition_fee}</div>
                          </div>
                          <div>
                            <button className="btn-cs btn-primary-cs">Pay</button>
                            <button className="btn-cs btn-primary-cs btn-delete" onClick={()=>removeItem(c)}><AiFillDelete/></button>
                          </div>
                          
                        </Dropdown.Item>
                       )
                    })}
                    {store.carts && store.carts.length === 0 && (
                      <Dropdown.Item>
                         <small>Không có khóa học nào</small>
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {!user && (
                <>
                  <Link
                    className="nav-link-right flex-center"
                    to={`/auth?_ref=teacher`}
                  >
                    For Teacher
                  </Link>
                  <Link
                    className="btn-cs btn-primary-cs btn-login"
                    role="button"
                    to={`/auth?_ref=student`}
                  >
                    Log In / Sign Up
                  </Link>
                </>
              )}

              {user && (
                <Dropdown className="dropdown-profile">
                  <Dropdown.Toggle>
                    <FiUser />
                    {user.fullname}
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
                    <Link
                      className="dropdown-item"
                      role="button"
                      onClick={() => handleLogOut()}
                    >
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
