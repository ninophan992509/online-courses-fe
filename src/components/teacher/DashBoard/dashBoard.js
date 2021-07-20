import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../../../contexts/AuthContext";
import { Row, Col, Card, Modal } from "react-bootstrap";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { GoPencil } from "react-icons/go";
import { BiPlus } from "react-icons/bi";
import Avatar from "react-avatar";
import Rating from "react-rating";
import numeral from "numeral";
import request from "../../../configs/request";
import ImageCustom from "../../guest/ImageCustom/imageCustom";
import AddCourse from "../AddCourse/addCourse";
import "./dashBoard.css";
import { InfoModal } from "../../student/Profile/profile";

const Course = ({ course }) => {
  const history = useHistory();
  return (
    <>
      <div className="card card-cs ">
        <ImageCustom
          className="card-16-9"
          src={course.picture}
          borderRadius="2px"
        />
        <Card.Body>
          <div
            className="card-title"
            onClick={() => {
              history.push(`/edit-course/${course.id}`);
            }}
          >
            {course.course_name ? course.course_name : course.name}
          </div>
          <div className="card-rating">
            <Rating
              emptySymbol={<TiStarOutline />}
              fullSymbol={<TiStarFullOutline />}
              readonly
              initialRating={course.rating}
              style={{ fontSize: "1.1rem", color: "#eb910a" }}
            />
            <small>{` (${numeral(course.number_rating || course.ratings).format(
              "0,0"
            )})`}</small>
            <Link
              className="card-link-cs link-cat"
              to={`/courses/search?catId=${course.categoryId}`}
            >
              {course.category_name}
            </Link>
          </div>
          <div className="flex-end-center">
            {(course.sale_price || +course.sale !== 0) && (
              <span className="card-sale">
                ${course.sale || course.sale_price}
              </span>
            )}
            <span
              className={
                course.sale || course.sale_price ? "card-price" : "card-sale"
              }
            >
              ${course.tuition_fee || course.price}
            </span>
          </div>
          <div className="card-btn">
            <div className="left">
              <button
                className="btn-icon btn-icon-cs btn-like"
                onClick={() => {
                  history.push(`/edit-course/${course.id}`);
                }}
              >
                <GoPencil />
              </button>
            </div>
          </div>
        </Card.Body>
      </div>
    </>
  );
};

function DashBoard() {
  const { auth } = useContext(authContext);
  const { user } = auth;
  const [course, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user) {
      loadMyCourses();
      setUserInfo(user);
    }
  }, [user]);

  const loadUserInfo = async (id) => {
    try {
      const res = await request({
        method: "GET",
        url: `/users/${id}`,
      });

      if (res.code) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        setUserInfo(res.data.data);
      }
    } catch (error) {
      alert("Error. Please try again");
    }
  };

  const loadMyCourses = async () => {
    const res = await request({
      method: "GET",
      url: `/courses/my-courses`,
      // params: {teacherId: user.id}
    });

    if (res.code) {
      setCourses(res.data.rows);
    } else {
      alert("Lối. Hãy thử lại");
    }
  };

  return (
    <>
      {userInfo && (
        <Row>
          <Col md={4} sm={12}>
            <div className="course-body">
              <h3>Teacher Profile</h3>
              <Avatar name={userInfo.email} size="100" round="4px" />
              <h5 className="mt-2">
                <b>{userInfo.email}</b>
              </h5>
              <div>@{userInfo.fullname}</div>
              <button
                className="btn-cs btn-primary-cs mt-3 w-100"
                onClick={() => setShowEdit(true)}
              >
                Edit Info
              </button>
            </div>
          </Col>
          <Col md={8} sm={12}>
            <div className="course-body">
              <Modal
                className="modal-add"
                show={show}
                onHide={() => setShow(false)}
                size="lg"
              >
                <AddCourse />
              </Modal>
              <div className="flex-between-center">
                <h3>My Courses</h3>
                <button
                  className="btn-cs btn-light-cs"
                  onClick={(e) => {
                    // history.push("/new-course");
                    setShow(true);
                  }}
                >
                  <BiPlus />
                  Thêm khóa học
                </button>
              </div>
              <div className="top-purchased-courses">
                {course &&
                  course.map((course, index) => {
                    return (
                      <div className="card-wrap-item" key={index}>
                        <Course course={course} type="private" />
                      </div>
                    );
                  })}
              </div>
              {course.length === 0 && (
                <div className="my-5">
                  <small>Bạn chưa đăng tải khóa học nào</small>
                </div>
              )}
            </div>{" "}
          </Col>
          <InfoModal
            user={user}
            show={showEdit}
            onHide={() => setShowEdit(false)}
            loadUserInfo={loadUserInfo}
          />
        </Row>
      )}
    </>
  );
}

export default DashBoard;
