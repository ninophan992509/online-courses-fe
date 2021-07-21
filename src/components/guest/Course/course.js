/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Table, Accordion, Modal } from "react-bootstrap";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Player } from "video-react";
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
import moment from "moment";
import "./course.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { _course, _courses } from "../HomePage/data";
import RatingChart from "../RatingChart/ratingChart";
import { Course as SingleCourse } from "../CourseList/courseList";
import request from "../../../configs/request";
import { appContext } from "../../../contexts/AppContext";
import { ADD_ITEM_TO_CART, REMOVE_ITEM_IN_CART } from "../../../constants";
import { authContext } from "../../../contexts/AuthContext";

const Lectures = ({ lectures, onShowPreview, isPreview }) => {
  return (
    <div className="course-lecture">
      {lectures &&
        lectures
          .sort((a, b) => a.number_order - b.number_order)
          .map((lecture, index) => {
            return (
              <Card.Body
                key={index}
                className={`course-lecture-item ${
                  lecture.preview || isPreview ? "preview" : ""
                }`}
              >
                <span className="course-lecture-icon">
                  <RiVideoLine />
                </span>
                <span className="course-wrap-name">
                  <span
                    className={`course-lecture-name`}
                    onClick={
                      lecture.preview || isPreview
                        ? () => onShowPreview(lecture)
                        : () => {}
                    }
                  >
                    {`Lesson ${lecture.number_order}: ${lecture.name}`}
                  </span>
                  <span>{numeral(lecture.duration).format("00:00")}</span>
                </span>
              </Card.Body>
            );
          })}
    </div>
  );
};

const VideoModal = (props) => {
  const { show, onHide, lecture, course } = props;
  const [link, setLink] = useState("");

  useEffect(() => {
    if (lecture && lecture.video && lecture.video.link) {
      setLink(lecture.video.link);
    }
  }, [lecture]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {lecture ? lecture.name : ""}
        </Modal.Title>
      </Modal.Header>
      {link && (
        <Modal.Body>
          <Player playsInline poster={course.picture} src={link} autoPlay />
        </Modal.Body>
      )}
      <Modal.Footer>
        <button className="btn-cs btn-primary-cs" onClick={() => onHide()}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

function Course() {
  const { store, dispatch } = useContext(appContext);
  const { auth } = useContext(authContext);
  const { user, role } = auth;
  const [liked, setLiked] = useState(false);
  const [course, setCourse] = useState(_course);
  const [courses, setCourses] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const [chapters, setChapters] = useState({
    chapters: [],
    page: 0,
    totalPage: 0,
  });
  const [feedbacks, setFeedbacks] = useState({
    feedbacks: [],
    page: 0,
    totalPage: 0,
  });
  const [show, setShow] = useState(false);
  const [lecture, setLecture] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      loadWatchList();
    }
  }, [user]);

  // useEffect(() => {
  //   if (watchList.length > 0 && id && watchList.find((c) => c.id === id)) {
  //     setLiked(true);
  //   } else {
  //     setLiked(false);
  //   }
  // }, [watchList, id]);

  const loadCourse = async (id) => {
    const res = await request({
      method: "GET",
      url: `/courses/${id}`,
    });
    if (res.code) {
      setCourse(res.data);
    }
  };

  const loadChapters = async (id) => {
    const res = await request({
      method: "GET",
      url: `/courses/${id}/chapters`,
      params: {
        page: chapters.page + 1,
        limit: 10,
      },
    });
    if (res.code) {
      setChapters({
        chapters: res.data.rows,
        page: res.pageNumber,
        totalPage: Math.floor(res.data.count / res.pageSize) + 1,
      });
    }
  };

  const loadFeedbacks = async (id) => {
    const res = await request({
      method: "GET",
      url: `/courses/${id}/feedbacks`,
      params: {
        feedbacks: feedbacks.page + 1,
        limit: 10,
      },
    });
    if (res.code) {
      setFeedbacks({
        feedbacks: res.data.rows,
        page: res.pageNumber,
        totalPage: Math.floor(res.data.count / res.pageSize) + 1,
      });
    }
  };

  const loadLesson = async (id) => {
    const res = await request({
      method: "GET",
      url: `/lesson/${id}`,
    });
    if (res.code) {
      setLecture(res.data);
    }
  };

  const loadRelateCourses = async (id) => {
    const res = await request({
      method: "GET",
      url: `/courses/${id}/relate`,
    });
    if (res.code) {
      setCourses(res.data);
    }
  };

  const loadWatchList = async () => {
    const res = await request({
      method: "GET",
      url: `/courses/watch-list`,
    });

    if (res.code) {
      setWatchList(res.data.rows);
      const isExist =
        res.data.rows.length > 0 &&
        res.data.rows.find((c) => c.id === course.id);
      setLiked(isExist ? true : false);
    } else {
      setWatchList([]);
    }
  };

  useEffect(() => {
    if (id) {
      loadCourse(id);
      loadChapters(id);
      loadFeedbacks(id);
      loadRelateCourses(id);
    }
  }, [location]);

  const onShowPreview = (lecture) => {
    // if (user)
    //   loadLesson(lecture.id);
    // else
    setLecture(lecture);
    setShow(true);
  };

  const calcLecturesDurationTotal = (lectures) => {
    if (lectures) {
      let total = 0;
      lectures.forEach((l) => {
        total += l.duration;
      });
      return total;
    }
    return 0;
  };

  const addToCart = (item) => {
    const carts = store.carts;
    const isExist = carts.find((c) => c.id === item.id);
    if (!isExist) {
      dispatch({
        type: ADD_ITEM_TO_CART,
        payload: item,
      });
    } else {
      alert("Bạn đã thêm khóa học này vào giỏ hàng");
    }
  };

  const onBuyCourse = async (course) => {
    if (!user || role !== "student") {
      history.push({
        pathname: `/auth?_ref=student`,
        state: { from: location.pathname },
      });
    } else {
      try {
        const res = await request({
          method: "POST",
          url: `/courses/${course.id}/enroll`,
        });

        if (res.code) {
          dispatch({
            type: REMOVE_ITEM_IN_CART,
            payload: course,
          });
          history.push("/profile?ref=student");
        } else {
          alert("Lối. Hãy thử lại");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response.data.message === "User enrolled on this course") {
            dispatch({
              type: REMOVE_ITEM_IN_CART,
              payload: course,
            });
            alert("Bạn đã mua khóa học này");
          }
        }
      }
    }
  };

  const handleWatchList = async (course) => {
    if (!user || role !== "student") {
      history.push(`/auth?_ref=student`, {
        state: { from: location.pathname },
      });
    } else {
      const isExist =
        watchList.length > 0 && watchList.find((c) => c.id === course.id);
      try {
        const res = await request({
          method: isExist ? "DELETE" : "POST",
          url: `/courses/${course.id}/watch-list`,
        });

        if (res.code) {
          loadWatchList();
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.message);
        }
      }
    }
  };

  return (
    <>
      <VideoModal
        show={show}
        onHide={() => setShow(false)}
        lecture={lecture}
        course={course}
      />
      <div className="course-head">
        <Row className="course-row-head">
          <Col md="8" className="left">
            <div>
              <ImageCustom
                width="100%"
                className="card-25-9"
                src={course.picture}
              />
            </div>
            <div className="course-info-head">
              <div className="course-wrap-badge">
                {(course.isNew || course.isMostEnrolled) && (
                  <span
                    className={`card-badge course-badge ${
                      course.isNew ? "new" : "best-seller"
                    }`}
                  >
                    {course.isNew ? "New" : "Best seller"}
                  </span>
                )}
              </div>
              <h3>
                <span>{course.course_name}</span>
              </h3>
              <div>{course.short_description || course.description}</div>
              <div className="course-rating-head">
                <Rating
                  emptySymbol={<TiStarOutline />}
                  fullSymbol={<TiStarFullOutline />}
                  readonly
                  initialRating={course.rating}
                  style={{ fontSize: "1.1rem", color: "#eb910a" }}
                />
                <small className="text-number">{` (${numeral(
                  course.ratings || course.number_rating
                ).format("0,0")})`}</small>
              </div>
              <div>
                Students:{" "}
                <span className="text-number">{`${numeral(
                  course.students || course.number_enrolled
                ).format("0,0")}`}</span>
              </div>
              <div>
                Create by{" "}
                <Link className="" to={`/teacher?id=${course.teacher_id}`}>
                  {course.teacher_name}
                </Link>
              </div>
              <div>
                Last updated:{" "}
                <span className="text-number">
                  {course.last_update || moment(course.updateAt).format("L")}
                </span>
              </div>
              <div className="flex-start-center course-price">
                {(course.sale_price || +course.sale !== -1) && (
                  <span className="card-sale">
                    ${course.sale_price || course.sale}
                  </span>
                )}
                <span
                  className={
                    course.sale_price || +course.sale !== -1
                      ? "card-price"
                      : "card-sale"
                  }
                >
                  ${course.price || course.tuition_fee}
                </span>
              </div>
              <div className="course-buttons">
                <button
                  className="btn-cs btn-light-cs"
                  onClick={() => handleWatchList(course)}
                >
                  {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                </button>
                {/* {store.carts.length === 0 && store.carts.find(c => c.id === course.id) && ( */}
                <button
                  className="btn-cs btn-primary-cs"
                  onClick={() => addToCart(course)}
                >
                  {"Add to cart  "}
                  <FiShoppingCart />
                </button>
                {/* )} */}

                <button
                  className="btn-cs btn-primary-cs"
                  onClick={() => onBuyCourse(course)}
                >
                  {"Buy now"}
                </button>
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
                          "0,0"
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
                          "0,0"
                        )} students`}
                      </span>
                    </td>
                  </tr>
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
          {course.description && (
            <ReactQuill
              value={course.description}
              readOnly={true}
              theme={"bubble"}
            />
          )}
        </div>
      </div>
      <div className="course-body">
        <div className="course-content">
          <div className="flex-between-center">
            <h3>Course Content</h3>
            <div>{course.status === 1 ? "Full section" : "Updating"}</div>
          </div>
          <Accordion defaultActiveKey="0" className="course-section">
            {chapters.chapters.length > 0 &&
              chapters.chapters.map((section, index) => {
                return (
                  <Card key={index}>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={index + 1}
                      className="flex-between-center"
                    >
                      <div className="section-name">{`Section ${
                        /*section.stt*/ index + 1
                      }: ${/*section.name*/ section.chapter_name}`}</div>
                      <div>{`${
                        /*section.lectures.length ||*/ section.lessons.length
                      } lectures • ${numeral(
                        calcLecturesDurationTotal(
                          /*section.lectures*/ section.lessons
                        )
                      ).format("00:00")}`}</div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index + 1}>
                      <Lectures
                        lectures={/*section.lectures*/ section.lessons}
                        onShowPreview={onShowPreview}
                        isPreview={section.is_previewed === 1}
                      />
                    </Accordion.Collapse>
                  </Card>
                );
              })}
          </Accordion>
          {chapters.chapters.length === 0 && (
            <div className="text-not-found">Chưa cập nhật nội dung</div>
          )}
          {chapters.page < chapters.totalPage && (
            <div className="flex-center mt-2">
              <button className="btn-cs btn-primary-cs">
                Show more contents
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="course-body">
        <div className="course-feedback">
          <div className="flex-start-center">
            <div className="course-rating-point">
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
            <div className="course-rating-chart">
              {/* <RatingChart chart={course.rating_chart} total={course.ratings} /> */}
            </div>
          </div>
          <div className="course-review">
            {
              /*course.reviews &&*/
              feedbacks.feedbacks.map((review, index) => {
                return (
                  <div className="course-review-item" key={index}>
                    <span className="course-wrap-review-img">
                      <ImageCustom
                        width="48px"
                        height="48px"
                        borderRadius="50%"
                      />
                    </span>
                    <div className="">
                      <div>
                        {review.user_name || review.user
                          ? review.user.fullname
                          : ""}
                      </div>
                      <div>
                        <Rating
                          emptySymbol={<TiStarOutline />}
                          fullSymbol={<TiStarFullOutline />}
                          readonly
                          initialRating={review.rating}
                          style={{ fontSize: "1.1rem", color: "#eb910a" }}
                        />{" "}
                        <small>{`  ${moment(
                          /*review.review_at*/
                          review.updatedAt
                        ).fromNow()}`}</small>
                      </div>
                      <div>{review.content}</div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          {feedbacks.feedbacks.length > 0 &&
            feedbacks.page < feedbacks.totalPage && (
              <div className="flex-center mt-2">
                <button className="btn-cs btn-primary-cs">
                  Show more reviews
                </button>
              </div>
            )}
        </div>
      </div>
      <div className="course-body">
        <h3>Top purchased courses in same field</h3>
        <div className="top-purchased-courses">
          {courses &&
            courses.slice(0, 5).map((course, index) => {
              return (
                <div className="card-wrap-item" key={index}>
                  <SingleCourse course={course} type="sale" />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Course;
