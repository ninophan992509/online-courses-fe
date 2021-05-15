import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import ImageCustom from "../ImageCustom/imageCustom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./courseList.css";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import Rating from "react-rating";
import numeral from "numeral";

const Course = ({ course }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card-wrap-item">
      <Link className="card card-cs " to={`/course?id=${course.id}`}>
        <ImageCustom
          className="card-img-cs"
          src={course.image}
          borderRadius="2px"
        />
        <Card.Body>
          <Card.Title>{course.name}</Card.Title>
          <div className="card-rating">
            <Rating
              emptySymbol={<TiStarOutline />}
              fullSymbol={<TiStarFullOutline />}
              readonly
              initialRating={course.rating}
              style={{ fontSize: "1.1rem", color: "#eb910a" }}
            />
            <small>{` (${numeral(course.students).format(
              "000,000,000"
            )})`}</small>
            <Link
              className="card-link-cs link-cat"
              to={`/course?category=${course.id}`}
            >
              {course.category_name}
            </Link>
            <Link
              className="card-link-cs link-teach"
              to={`/teacher?id=${course.teacher_id}`}
            >
              {course.teacher_name}
            </Link>
          </div>
          <div className="flex-end-center">
            {course.sale_price && (
              <span className="card-sale">${course.sale_price}</span>
            )}
            <span className={course.sale_price ? "card-price" : "card-sale"}>
              ${course.price}
            </span>
          </div>
          <div className="card-btn">
            <div className="left">
              <button
                className="btn-icon btn-icon-cs btn-like"
                onClick={() => setLiked(!liked)}
              >
                {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </button>
            </div>
            <div className="right">
              <button className="btn-icon btn-icon-cs btn-cart">
                <FiShoppingCart />
              </button>
            </div>
          </div>
        </Card.Body>
      </Link>
    </div>
  );
};

function CourseList({ title, settings, courses }) {
  // const [courses, setCourses] = useState(_courses);
  return (
    <div className="course-list">
      {title && <div className="list-title">{title}</div>}
      <Slider {...settings} className="slider-cs">
        {courses &&
          courses.length > 0 &&
          courses.map((course, index) => {
            return <Course course={course} key={index} />;
          })}
      </Slider>
    </div>
  );
}

export default CourseList;
