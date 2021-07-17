import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";
import { Link, useLocation } from "react-router-dom";
import "./profile.css";
import numeral from "numeral";
import { Course } from '../../guest/CourseList/courseList';
import { authContext } from "../../../contexts/AuthContext";
import { _courses } from "../../guest/HomePage/data";
import request from "../../../configs/request";


function Profile() {
  const { auth } = useContext(authContext);
  const { user } = auth;
  const [myCourses, setMyCourses] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (user)
    {
      loadMyCourses();
      loadWatchList();
    }
  }, [user,location]);
  
  const loadMyCourses = async() => {
    const res = await request({
      method: "GET",
      url: `/courses/enrolled`,
    });

    if (res.code) {
      setMyCourses(res.data.rows);
    } else {
      alert("Lối. Hãy thử lại");
    }
  }
  
  const loadWatchList = async () => {
    const res = await request({
      method: "GET",
      url: `/courses/watch-list`,
    });

    if (res.code) {
      setWatchList(res.data.rows);
    } else {
      alert("Lối. Hãy thử lại");
    }
  }

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
              {myCourses.length === 0 && (
                <div className="my-5">
                  <small>Bạn chưa mua khóa học nào</small>
                </div>
              )}
            </div>{" "}
            <div className="course-body">
              <h3>Watch List</h3>
              <div className="top-purchased-courses">
                {watchList &&
                  watchList.map((course, index) => {
                    return (
                      <div className="card-wrap-item" key={index}>
                        <Course course={course} type="favour" />
                      </div>
                    );
                  })}
              </div>
              {watchList.length === 0 && (
                <div className="my-5">
                  <small>Bạn chưa yêu thích khóa học nào</small>
                </div>
              )}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Profile;
