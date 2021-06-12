import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import "./profile.css";
import numeral from "numeral";
import { Course } from '../../guest/CourseList/courseList';
import { authContext } from "../../../contexts/AuthContext";
import { _courses } from "../../guest/HomePage/data";

function Profile() {
  const { auth } = useContext(authContext);
    const { user } = auth;
    const [myCourses, setMyCourses] = useState(_courses);
    const [favourCourses, setfavourCourses] = useState(_courses);
  return (
    <>
      {user && (
        <Row>
          <Col md={4} sm={12}>
            <div className="course-body">
              <h3>Account Information</h3>
              <Avatar name={user.email} size="100" round="4px" />
              <h5 className="mt-2">
                <b>{user.email}</b>
              </h5>
              <div>@{user.fullname}</div>
              <button className="btn-cs btn-primary-cs mt-3 w-100">
                Edit Info
              </button>
              <button className="btn-cs btn-primary-cs mt-3 w-100">
                Change Password
              </button>
            </div>
          </Col>
          <Col md={8} sm={12}>
            <div className="course-body">
              <h3>My Courses</h3>
              <div className="top-purchased-courses">
                {myCourses &&
                  myCourses.map((course, index) => {
                    return (
                      <div className="card-wrap-item" key={index}>
                        <Course course={course} type="private" />
                      </div>
                    );
                  })}
              </div>
            </div>{" "}
            <div className="course-body">
              <h3>Watch List</h3>
              <div className="top-purchased-courses">
                {favourCourses &&
                  favourCourses.map((course, index) => {
                    return (
                      <div className="card-wrap-item" key={index}>
                        <Course course={course} type="favour" />
                      </div>
                    );
                  })}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Profile;
