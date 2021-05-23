import React, { useState } from "react";
import { Row, Col, Card, Table, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageCustom from "../ImageCustom/imageCustom";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { MdRateReview } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaDiscourse } from "react-icons/fa";
import { RiVideoLine } from "react-icons/ri";
import Rating from "react-rating";
import numeral from "numeral";
import "./course.css";
import { _course } from "../HomePage/data";
import RatingChart from "../RatingChart/ratingChart";

const Lectures = ({ lectures }) => {
  return (
    <div className="course-lecture">
      {lectures &&
        lectures.map((lecture, index) => {
          return (
            <Card.Body
              className={`course-lecture-item ${
                lecture.preview ? "preview" : ""
              }`}
            >
              <span className="course-lecture-icon">
                <RiVideoLine />
              </span>
              <span className="course-wrap-name">
                <span className={`course-lecture-name`}>{lecture.name}</span>
                <span>{numeral(lecture.duration).format("00:00")}</span>
              </span>
            </Card.Body>
          );
        })}
    </div>
  );
};

function Course() {
  const [liked, setLiked] = useState(false);
  const [course, setCourse] = useState(_course);
  const calcLecturesDurationTotal = (lectures) => {
    if (lectures) {
      let total = 0;
      lectures.map((l) => {
        total += l.duration;
      });
      return total;
    }
    return 0;
  };

  return (
    <>
      <div className="course-head">
        <Row className="course-row-head">
          <Col md="8" className="left">
            <div>
              <ImageCustom width="100%" className="card-25-9" />
            </div>
            <div className="course-info-head">
              <div className="course-wrap-badge">
                {(course.new || course.best_seller) && (
                  <span
                    className={`card-badge course-badge ${
                      course.new ? "new" : "best-seller"
                    }`}
                  >
                    {course.new ? "New" : "Best seller"}
                  </span>
                )}
              </div>
              <h3>
                <span>{course.name}</span>
              </h3>
              <div>{course.short_description}</div>
              <div className="course-rating-head">
                <Rating
                  emptySymbol={<TiStarOutline />}
                  fullSymbol={<TiStarFullOutline />}
                  readonly
                  initialRating={course.rating}
                  style={{ fontSize: "1.1rem", color: "#eb910a" }}
                />
                <small className="text-number">{` (${numeral(
                  course.ratings
                ).format("000,000,000")})`}</small>
              </div>
              <div>
                Students:{" "}
                <span className="text-number">{`${numeral(
                  course.students
                ).format("000,000,000")}`}</span>
              </div>
              <div>
                Create by{" "}
                <Link className="" to={`/teacher?id=${course.teacher_id}`}>
                  {course.teacher_name}
                </Link>
              </div>
              <div>
                Last updated:{" "}
                <span className="text-number">{course.last_update}</span>
              </div>
              <div className="flex-start-center course-price">
                {course.sale_price && (
                  <span className="card-sale">${course.sale_price}</span>
                )}
                <span
                  className={course.sale_price ? "card-price" : "card-sale"}
                >
                  ${course.price}
                </span>
              </div>
              <div className="course-buttons">
                <button
                  className="btn-cs btn-light-cs"
                  onClick={() => setLiked(!liked)}
                >
                  {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                </button>
                <button className="btn-cs btn-primary-cs">
                  {"Add to cart  "}
                  <FiShoppingCart />
                </button>
                <button className="btn-cs btn-primary-cs">{"Buy now"}</button>
              </div>
            </div>
          </Col>
          <Col md="4" className="right">
            <div className="w-100">
              <div className="flex-between-center">
                <div>
                  <ImageCustom width="10vw" height="10vw" borderRadius="2px" />
                </div>
                <div className="ml-2">
                  <h3>Instructor</h3>
                  <h5>{course.teacher_name}</h5>
                  <div>{course.teacher_expert}</div>
                </div>
              </div>
              <Table className="table-info-teacher">
                <tbody>
                  <tr>
                    <td>
                      <TiStarFullOutline />
                    </td>
                    <td>
                      <span className="text-number">
                        {`${course.teacher_rating} rating`}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <MdRateReview />
                    </td>
                    <td>
                      <span className="text-number">
                        {`${numeral(course.teacher_reviews).format(
                          "000,000,000"
                        )} reviews`}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <IoIosPeople />
                    </td>
                    <td>
                      <span className="text-number">
                        {`${numeral(course.teacher_students).format(
                          "000,000,000"
                        )} students`}
                      </span>
                    </td>
                  </tr>{" "}
                  <tr>
                    <td>
                      <FaDiscourse />
                    </td>
                    <td>
                      <span className="text-number">
                        {`${course.teacher_courses} courses`}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <h3>About Instructor</h3>
                <p>{course.teacher_description}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="course-body">
        <div className="course-description">
          <h3>Description</h3>
          <p>{course.full_description}</p>
        </div>
      </div>
      <div className="course-body">
        <div className="course-content">
          <h3>Course Content</h3>
          <div></div>
          <Accordion defaultActiveKey="0" className="course-section">
            {course.sections &&
              course.sections.map((section, index) => {
                return (
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={index + 1}
                      className="flex-between-center"
                    >
                      <div className="section-name">{`Section ${section.stt}: ${section.name}`}</div>
                      <div>{`${section.lectures.length} lectures • ${numeral(
                        calcLecturesDurationTotal(section.lectures)
                      ).format("00:00")}`}</div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index + 1}>
                      <Lectures lectures={section.lectures} />
                    </Accordion.Collapse>
                  </Card>
                );
              })}
          </Accordion>
        </div>
      </div>
      <div className="course-body">
        <div className="course-feedback">
          <div className="flex-start-center">
            <div className="flex-column-center">
              <span className="text-rating-number">{course.rating}</span>
              <Rating
                emptySymbol={<TiStarOutline />}
                fullSymbol={<TiStarFullOutline />}
                readonly
                initialRating={course.rating}
                style={{ fontSize: "1.1rem", color: "#eb910a" }}
              />
              <span>{"Course Rating"}</span>
            </div>
            <div>
              <RatingChart chart={course.rating_chart} total={course.ratings} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
