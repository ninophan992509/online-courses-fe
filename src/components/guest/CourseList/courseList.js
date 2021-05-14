import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import ImageCustom from "../ImageCustom/imageCustom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./setting";
import "./courseList.css";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import Rating from "react-rating";
import numeral from "numeral";

const _courses = [
  {
    id: 1,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 129.99,
    sale_price: null,
    image: null,
  },
  {
    id: 2,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 129.99,
    sale_price: null,
    image: null,
  },
  {
    id: 3,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 129.99,
    sale_price: null,
    image: null,
  },
  {
    id: 4,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 129.99,
    sale_price: null,
    image: null,
  },
  {
    id: 5,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 129.99,
    sale_price: null,
    image: null,
  },
  {
    id: 6,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 129.99,
    sale_price: null,
    image: null,
  },
  {
    id: 7,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 129.99,
    sale_price: null,
    image: null,
  },
];

function CourseList() {
  const [courses, setCourses] = useState(_courses);
  return (
    <Slider {...settings}>
      {courses &&
        courses.length > 0 &&
        courses.map((course, index) => {
          return (
            <div className="card-wrap-item">
              <Card className="card-cs">
                <ImageCustom src={course.image} height={"140px"} />
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
                    <a className="card-link-cs link-cat" href="/">
                      {course.category_name}
                    </a>
                    <a className="card-link-cs link-teach" href="/">
                      {course.teacher_name}
                    </a>
                  </div>
                  <div className="card-btn">
                    <btn className="btn-icon btn-icon-cs btn-cart">
                      <FiShoppingCart />
                    </btn>
                    <btn className="btn-icon btn-icon-cs btn-like">
                      <AiOutlineHeart />
                    </btn>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </Slider>
  );
}

export default CourseList;
