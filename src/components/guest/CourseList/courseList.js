import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import ImageCustom from "../ImageCustom/imageCustom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./courseList.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { responsive } from "../../../configs/carousel-responsive";
import Rating from "react-rating";
import numeral from "numeral";

export const Course = ({ course, type }) => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="card card-cs ">
        {type === "sale" && (
          <>
            {(course.new || course.best_seller) && (
              <span
                className={`card-badge ${course.new ? "new" : "best-seller"}`}
              >
                {course.new ? "New" : "Best seller"}
              </span>
            )}
          </>
        )}

        <ImageCustom
          className="card-16-9"
          src={course.image}
          borderRadius="2px"
        />
        <Card.Body>
          <Link
            className="card-title"
            to={
              type === "private"
                ? `/student-courses/${course.id}`
                : `/course/${course.id}`
            }
          >
            {course.course_name || course.name}
          </Link>
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
          {type === "sale" && (
            <div className="flex-end-center">
              {(course.sale_price || course.sale) && !course.sale && (
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
          )}
          {(type === "sale" || type === "favour") && (
            <div className="card-btn">
              {type === "favour" && (
                <div className="left">
                  <button
                    className="btn-icon btn-icon-cs btn-like"
                    onClick={() => setLiked(!liked)}
                  >
                    {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                  </button>
                </div>
              )}
              {type === "sale" && (
                <div className="right">
                  <button className="btn-icon btn-icon-cs btn-cart">
                    <FiShoppingCart />
                  </button>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </div>
    </>
  );
};

function CourseList({ title, settings, courses, type }) {
  // const [courses, setCourses] = useState(_courses);
  return (
    <div className="course-list">
      {title && <div className="list-title">{title}</div>}
      <Carousel /*{...settings}*/ responsive={responsive} className="slider-cs">
        {courses &&
          courses.length > 0 &&
          courses.map((course, index) => {
            return (
              <div className="card-wrap-item" key={index}>
                <Course course={course} type={type} />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}

export default CourseList;
