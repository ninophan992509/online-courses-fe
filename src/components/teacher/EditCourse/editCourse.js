import React, { useState, useRef, useCallback, useEffect } from "react";
import { Form, Spinner, Modal } from "react-bootstrap";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Player } from "video-react";
import { GoPencil } from "react-icons/go";
import { TiDelete } from "react-icons/ti";
import { MdSlowMotionVideo } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadFile, {
  deleteFileOnFirebase,
} from "../../../configs/firebaseConfig";
import "../AddCourse/addCourse.css";
import { useLoadCategories } from "../../guest/Header/useLoadCategories";
import request from "../../../configs/request";
import "./editCourse.css";

function EditCourse() {
  const [newCourse, setNewCourse] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preUrl, setPreUrl] = useState(null);
  const [subCats, setSubCats] = useState(null);
  const [filter, setFilter] = useState({});
  const [message, setMessage] = useState([]);
  const [course, setCourse] = useState(null);
  const [upLoading, setUploading] = useState(false);
  const [offSale, setOffSale] = useState(true);
  const [status, setStatus] = useState(0);
  const [chapters, setChapters] = useState({
    chapters: [],
    page: 0,
    totalPage: 0,
  });
  const [lecture, setLecture] = useState(null);
  const { id } = useParams();
  const { loading, error, cats, hasMore, pageNumber } =
    useLoadCategories(filter);
  const history = useHistory();
  const location = useLocation();
  const observer = useRef();
  const [courseId, setCourseId] = useState(null);
  const [showNewChapter, setNewChapter] = useState(false);
  const [showNewLesson, setNewLesson] = useState(false);
  const [showEditChapter, setEditChapter] = useState(false);
  const [showEditLesson, setEditLesson] = useState(false);
  const [showAddVideo, setAddVideo] = useState(false);
  const [oldPicture, setOldPicture] = useState(null);
  const [chapSl, setChapSl] = useState(null);
  const [lessonSl, setLessonSl] = useState(null);

  useEffect(() => {
    if (id) {
      setCourseId(id);
    }
  }, [id]);

  useEffect(() => {
    if (courseId) {
      loadCourse(courseId);
      loadChapters(courseId, 1);
    }
  }, [location, courseId]);

  const getURL = (_url) => {
    if (_url) {
      setNewCourse({ ...newCourse, picture: _url });
    } else {
      setUploading(false);
      alert("Error in uploading file. Please try again");
    }
  };

  useEffect(() => {
    if (newCourse && newCourse.picture && upLoading) {
      setOldPicture(newCourse.picture);
      const data = {
        id: +courseId,
        tuition_fee: +newCourse.tuition_fee,
        sale: offSale ? -1 : +newCourse.sale,
        status: status ? 1 : 0,
        picture: newCourse.picture,
      };
      if (newCourse.course_name !== course.course_name)
        data.course_name = newCourse.course_name;
      if (newCourse.short_description !== course.short_description)
        data.short_description = newCourse.short_description;
      if (newCourse.description !== course.description)
        data.description = newCourse.description;
      editCourse(data);
      setUploading(false);
    }
  }, [newCourse]);

  // const createNewCourse = async () => {
  //   try {
  //     const res = await request({
  //       method: "POST",
  //       url: `/courses`,
  //       data: newCourse,
  //     });

  //     if (res.code) {
  //       history.push("/dashboard");
  //     }
  //   } catch (error) {
  //     alert("Error. Please try again");
  //   }
  //   setUploading(false);
  // };

  const onClickCatItem = (id) => {
    if (cats && cats.length > 0 && id) {
      const fCat = cats.find((cat) => +cat.id === +id);
      if (fCat) setSubCats(fCat.categories);
    }
  };

  const onChangeValue = (e, name) => {
    const val = e.target.value;
    setNewCourse({
      ...newCourse,
      [name]: name === "categoryId" || name === "tuition_fee" ? +val : val,
    });
  };

  const onChangeEditor = (html) => {
    setNewCourse({
      ...newCourse,
      description: html,
    });
  };

  const onChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setPreUrl(url);
      setThumbnail(files[0]);
    }
  };

  const onSubmitNewCourse = (e) => {
    e.preventDefault();
    let msg = [];
    if (!newCourse.course_name) {
      msg.push("The course name is required");
    }

    if (!newCourse.description) {
      msg.push("The description is required");
    }

    if (!newCourse.short_description) {
      msg.push("The short description is required");
    }

    if (+newCourse.categoryId === 0) {
      msg.push("Please select course category and subcategory");
    }

    if (newCourse.tuition_fee === 0) {
      msg.push("The tuition fee must be greater than 0");
    }

    if (msg.length > 0) {
      setMessage(msg);
      return;
    } else {
      if (thumbnail) {
        setUploading(true);
        uploadFile(thumbnail, getURL);
      } else {
        const data = {
          id: +courseId,
          tuition_fee: +newCourse.tuition_fee,
          sale: offSale ? -1 : +newCourse.sale,
          status: status ? 1 : 0,
        };
        if (newCourse.course_name !== course.course_name)
          data.course_name = newCourse.course_name;
        if (newCourse.short_description !== course.short_description)
          data.short_description = newCourse.short_description;
        if (newCourse.description !== course.description)
          data.description = newCourse.description;
        editCourse(data);
      }
    }
  };

  const editCourse = async (data) => {
    try {
      const res = await request({
        url: "/courses",
        method: "PUT",
        data,
      });
      if (res.code) {
        alert("Update successfully");
        loadCourse(courseId);
        if (oldPicture) {
          deleteFileOnFirebase(oldPicture);
          setOldPicture(null);
        }
      }
    } catch (error) {
      alert("Error. Please try again");
    }
  };

  const loadCourse = async (id) => {
    const res = await request({
      method: "GET",
      url: `/courses/${id}`,
    });
    if (res.code) {
      setCourse(res.data);
      setNewCourse({
        ...newCourse,
        course_name: res.data.course_name,
        short_description: res.data.short_description,
        description: res.data.description,
        tuition_fee: res.data.tuition_fee,
        sale: res.data.sale,
        categoryId: res.data.categoryId,
        category_name: res.data.category_name,
      });
      setOffSale(res.data.sale === -1);
      setStatus(res.data.status === 1);
      setPreUrl(res.data.picture);
    }
  };

  const loadChapters = async (id, page) => {
    const res = await request({
      method: "GET",
      url: `/courses/${id}/chapters`,
      params: {
        page: page,
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

  const loadLesson = async (id) => {
    const res = await request({
      method: "GET",
      url: `/lesson/${id}`,
    });
    if (res.code) {
      setLecture(res.data);
    }
  };

  const onDeleteChapter = async (id) => {
    try {
      const res = await request({
        url: `/chapters/${id}`,
        method: "DELETE",
      });
      if (res.code) {
        loadChapters(courseId, 1);
      }
    } catch (error) {
      alert("Error. Please try again");
    }
  };

  return (
    <div className="row flex-between-center">
      {newCourse && (
        <div className="box-wrapper new-course col-12">
          <div className="title-heading">Course</div>
          <Form>
            <div className="row mb-3">
              <Form.Group className="col-12">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="The Complete 2021 Web Development Bootcamp"
                  value={newCourse.course_name}
                  onChange={(e) => onChangeValue(e, "course_name")}
                />
              </Form.Group>
            </div>
            <div className="row mb-3">
              <Form.Group className="col-lg-6">
                <Form.Label>Category</Form.Label>
                <div>{newCourse.category_name}</div>
              </Form.Group>
            </div>
            <div className="row mb-3">
              <Form.Group className="col-12">
                <Form.Label>Short description</Form.Label>
                <Form.Control
                  type="text"
                  value={newCourse.short_description}
                  onChange={(e) => onChangeValue(e, "short_description")}
                  placeholder="Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!"
                />
              </Form.Group>
            </div>
            <div className="row mb-3">
              <Form.Group className="col-md-4">
                <Form.Label>Tuition Fee</Form.Label>
                <Form.Control
                  type="number"
                  value={newCourse.tuition_fee}
                  onChange={(e) => onChangeValue(e, "tuition_fee")}
                  placeholder="20"
                  min="0"
                  className="input-number"
                />
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Sale Fee</Form.Label>
                <Form.Control
                  type="number"
                  value={newCourse.sale}
                  onChange={(e) => onChangeValue(e, "sale")}
                  placeholder="20"
                  readOnly={offSale}
                  min="0"
                  className="input-number"
                />
              </Form.Group>
              <Form.Group className="col-md-2">
                <Form.Label>OFF Sale</Form.Label>
                <Form.Switch
                  checked={offSale}
                  onChange={(e) => setOffSale(e.target.checked)}
                  type="checkbox"
                  className="custom-switch"
                />
              </Form.Group>
              <Form.Group className="col-md-2">
                <Form.Label>Finish</Form.Label>
                <Form.Switch
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  type="checkbox"
                  className="custom-switch"
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Full description</Form.Label>
              <ReactQuill
                value={newCourse.description}
                onChange={(html) => onChangeEditor(html)}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-5">
              <Form.Label className="d-block">Course Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => onChangeFile(e)}
              />
              {preUrl && (
                <div className="wrap-img-bg">
                  <img src={preUrl} alt="IMG" />
                </div>
              )}
            </Form.Group>
            {message.length > 0 && (
              <div>
                {message.map((m, index) => {
                  return <div className="text-danger mb-2">{m}</div>;
                })}
              </div>
            )}
            <div className=" d-flex flex-center mt-3">
              <button
                className="btn-cs btn-primary-cs"
                onClick={(e) => onSubmitNewCourse(e)}
              >
                {!upLoading && <>Cập nhật khóa học</>}
                {upLoading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}
              </button>
            </div>
          </Form>
        </div>
      )}

      <div className="box-wrapper new-course course-edit col-12">
        <div className="title-heading flex-between-center">
          <span>Content</span>
          <button
            className="btn-cs btn-light-cs"
            onClick={() => setNewChapter(true)}
          >
            <BiPlus />
            New Section
          </button>
        </div>
        <div className="list-chapter">
          {chapters.chapters.length > 0 &&
            chapters.chapters.map((chapter, index) => {
              return (
                <div>
                  <div className="row mb-2">
                    <div className="col-md-9">{`Section ${index + 1}: ${
                      chapter.chapter_name
                    }`}</div>
                    <div className="col-md-3 flex-between-center">
                      <button
                        className="btn-cs btn-light-cs"
                        onClick={() => {
                          setChapSl(chapter);
                          setNewLesson(true);
                        }}
                      >
                        <BiPlus />
                      </button>
                      <button
                        className="btn-cs btn-light-cs"
                        onClick={() => {
                          setChapSl(chapter);
                          setEditChapter(true);
                        }}
                      >
                        <GoPencil />
                      </button>
                      <button
                        className="btn-cs btn-light-cs"
                        onClick={() => onDeleteChapter(chapter.id)}
                      >
                        <TiDelete />
                      </button>
                    </div>
                  </div>
                  <div className="list-lesson">
                    {chapter.lessons.length > 0 &&
                      chapter.lessons
                        .sort((a, b) => +a.number_order - +b.number_order)
                        .map((lesson, index) => {
                          return (
                            <div className="row mb-3">
                              <div className="col-md-9">
                                {`Lesson ${lesson.number_order}: ${lesson.name}`}
                              </div>
                              <div className="col-md-3 flex-between-center">
                                <button
                                  className="btn-cs btn-light-cs"
                                  onClick={() => {
                                    setLessonSl(lesson);
                                    setAddVideo(true);
                                  }}
                                >
                                  <MdSlowMotionVideo />
                                </button>
                                <button
                                  className="btn-cs btn-light-cs"
                                  onClick={() => {
                                    setChapSl(chapter);
                                    setLessonSl(lesson);
                                    setEditLesson(true);
                                  }}
                                >
                                  <GoPencil />
                                </button>
                                <button
                                  className="btn-cs btn-light-cs"
                                  onClick={() => onDeleteChapter(chapter.id)}
                                >
                                  <TiDelete />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              );
            })}
        </div>
        {chapters.chapters && chapters.chapters.length === 0 && (
          <div className="my-5 flex-center">
            <small>No content</small>
          </div>
        )}
        <AddChapter
          courseId={courseId}
          loadChapters={loadChapters}
          show={showNewChapter}
          onHide={() => setNewChapter(false)}
        />
        <AddLesson
          courseId={courseId}
          loadChapters={loadChapters}
          show={showNewLesson}
          onHide={() => {
            setNewLesson(false);
            setChapSl(null);
          }}
          chapterId={chapSl ? chapSl.id : 0}
        />
        <EditChapter
          courseId={courseId}
          loadChapters={loadChapters}
          show={showEditChapter}
          onHide={() => {
            setEditChapter(false);
            setChapSl(null);
          }}
          chapter={chapSl}
        />

        <EditLesson
          courseId={courseId}
          loadChapters={loadChapters}
          show={showEditLesson}
          onHide={() => {
            setEditLesson(false);
            setChapSl(null);
            setLessonSl(null);
          }}
          chapter={chapSl}
          lesson={lessonSl}
        />
        <AddVideo
          course={course}
          show={showAddVideo}
          onHide={() => {
            setAddVideo(false);
            setLessonSl(null);
          }}
          lesson={lessonSl}
        />
      </div>
    </div>
  );
}

const AddChapter = ({ show, onHide, courseId, loadChapters }) => {
  const [chapName, setChapName] = useState("");

  const onAddChapter = async () => {
    if (chapName) {
      try {
        const res = await request({
          method: "POST",
          url: "/chapters",
          data: {
            courseId: +courseId,
            chapter_name: chapName,
          },
        });
        if (res.code) {
          loadChapters(courseId, 1);
          onHide();
        }
      } catch (error) {
        alert("Error. Please try again!");
      }
    } else {
      alert("You must be fill section name");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="title-heading">Add new section</Modal.Header>
      <Modal.Body>
        <Form.Group className="w-100">
          <Form.Label>Section</Form.Label>
          <Form.Control
            type="text"
            value={chapName}
            onChange={(e) => setChapName(e.target.value)}
            placeholder="Enter section 's name"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn-cs btn-primary-cs"
          onClick={() => onAddChapter()}
        >
          Add section
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const EditChapter = ({ show, onHide, courseId, loadChapters, chapter }) => {
  const [chap, setChap] = useState(null);
  useEffect(() => {
    if (chapter) {
      setChap(chapter);
    }
  }, [chapter]);

  const onEditChapter = async () => {
    if (chap) {
      try {
        const res = await request({
          method: "PUT",
          url: `/chapters`,
          data: {
            id: chapter.id,
            chapter_name: chap.chapter_name,
            is_previewed: chap.is_previewed,
          },
        });
        if (res.code) {
          loadChapters(courseId, 1);
          onHide();
        }
      } catch (error) {
        alert("Error. Please try again!");
      }
    } else {
      alert("You must be fill section name");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="title-heading">Edit section</Modal.Header>
      {chap && (
        <>
          <Modal.Body>
            <Form.Group className="w-100 mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                value={chap.chapter_name}
                onChange={(e) =>
                  setChap({ ...chap, chapter_name: e.target.value })
                }
                placeholder="Enter section name"
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Label>Allow Preview</Form.Label>
              <Form.Switch
                type="checkbox"
                className="custom-switch"
                checked={chap.is_previewed === 1}
                onChange={(e) =>
                  setChap({ ...chap, is_previewed: e.target.checked ? 1 : 0 })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-cs btn-primary-cs"
              onClick={() => onEditChapter()}
            >
              Confirm
            </button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

const EditLesson = ({
  show,
  onHide,
  courseId,
  loadChapters,
  chapter,
  lesson,
}) => {
  const [less, setLess] = useState(null);
  useEffect(() => {
    if (lesson) {
      setLess(lesson);
    }
  }, [lesson]);

  const onEditLesson = async () => {
    if (less.name && less.number_order !== 0) {
      try {
        const res = await request({
          method: "PUT",
          url: `/lesson/${lesson.id}`,
          data: {
            chapterId: chapter.id,
            name: less.name,
            number_order: +less.number_order,
            content: "",
          },
        });
        if (res.code) {
          loadChapters(courseId, 1);
          onHide();
        }
      } catch (error) {
        alert("Error. Please try again!");
      }
    } else {
      if (!lesson.name) alert("You must be fill section name");
      if (lesson.number_order === 0) alert("You must be fill lesson number");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="title-heading">Edit section</Modal.Header>
      {less && (
        <>
          <Modal.Body>
            <Form.Group className="w-100">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                value={less.name}
                onChange={(e) => setLess({ ...less, name: e.target.value })}
                placeholder="Enter lesson name"
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Label>Lesson number</Form.Label>
              <Form.Control
                type="number"
                value={less.number_order}
                onChange={(e) =>
                  setLess({ ...less, number_order: e.target.value })
                }
                placeholder="Enter lesson number"
                min="1"
                className="input-number"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-cs btn-primary-cs"
              onClick={() => onEditLesson()}
            >
              Confirm
            </button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

const AddLesson = ({ show, onHide, chapterId, loadChapters, courseId }) => {
  const [lesson, setLesson] = useState({
    name: "",
    chapterId: 0,
    number_order: 0,
  });

  useEffect(()=>{
   setLesson({
    name: "",
    chapterId: 0,
    number_order: 0,
  });
  },[show]);

  useEffect(() => {
    setLesson({
      ...lesson,
      chapterId,
    });
  }, [chapterId]);

  const onAddLesson = async () => {
    if (lesson.name && lesson.number_order !== 0) {
      try {
        const res = await request({
          method: "POST",
          url: "/lesson",
          data: {
            chapterId: +chapterId,
            name: lesson.name,
            number_order: +lesson.number_order,
            content: "",
          },
        });
        if (res.code) {
          loadChapters(courseId, 1);
          onHide();
        }
      } catch (error) {
        alert("Error. Please try again!");
      }
    } else {
      if (!lesson.name) alert("You must be fill section name");
      if (lesson.number_order === 0) alert("You must be fill lesson number");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="title-heading">Add new lesson</Modal.Header>
      <Modal.Body>
        <Form.Group className="w-100">
          <Form.Label>Section</Form.Label>
          <Form.Control
            type="text"
            value={lesson.name}
            onChange={(e) => setLesson({ ...lesson, name: e.target.value })}
            placeholder="Enter lesson name"
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label>Lesson number</Form.Label>
          <Form.Control
            type="number"
            value={lesson.number_order}
            onChange={(e) =>
              setLesson({ ...lesson, number_order: e.target.value })
            }
            placeholder="Enter lesson number"
            min="1"
            className="input-number"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-cs btn-primary-cs" onClick={() => onAddLesson()}>
          Add lesson
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const AddVideo = ({ show, onHide, course, lesson}) => {
  const [video, setVideo] = useState(null);
  const [preUrl, setPreUrl] = useState(null);
  const [link, setLink] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [oldLink, setOldLink]= useState(null);

  useEffect(() => {
    if (!show)
    {
      setVideo(null);
      if (preUrl) {
        URL.revokeObjectURL(preUrl);
        setPreUrl(null);
      }
      setLink(null);
      setUploading(false);
    }
  }, [show]);

  const loadVideo = async (id) => {
      const res = await request({
        method: "GET",
        url: `/lesson/${id}`,
      });
      if (res.code && res.data && res.data.video) {
        setPreUrl(res.data.video.link);
        setOldLink(res.data.video.link);
      }
  };

  useEffect(() => {
    if (lesson) {
      loadVideo(lesson.id);
    }
  }, [lesson]);

  useEffect(() => {
    if (link && uploading) {
      onAddVideo();
      setUploading(false);
    }
  }, [link,uploading]);

  const onAddVideo = async () => {
    
      try {
        const res = await request({
          method: "POST",
          url: "/video",
          data: {
            lessonId: +lesson.id,
            title: "",
            description: "",
            link: link,
            time: video.duration,
          },
        });
        if (res.code) {
          onHide();
          alert('Add video successfully');
          if(oldLink){
deleteFileOnFirebase(oldLink);
setOldLink(null);
          }
          
        }
      } catch (error) {
        alert("Error. Please try again!");
      }
  };

  const uploadVideo = () => {
    if (video)
    {
      setUploading(true);
      uploadFile(video, setLink);
    } else {
      alert('No video is selected!');
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="title-heading">Change Video Lesson</Modal.Header>
      <Modal.Body className="flex-column-center">
        {preUrl && <Player playsInline autoPlay poster={course.picture} src={preUrl} />}

        <button className="btn-cs btn-light-cs w-50 mt-3 btn-upload">
          <AiOutlineCloudUpload />
          Upload video
          <input
            type="file"
            accept="video/*"
            id="videoInput"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                if (file.size < 5 * 1000 * 1000) {
                  setVideo(file);
                  setPreUrl(URL.createObjectURL(file));
                } else {
                  alert("File too large! Upload file with size less than 5MB");
                }
              }
            }}
          />
        </button>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-cs btn-primary-cs" onClick={() => uploadVideo()} disabled={uploading}>
          { uploading ? (  <Spinner animation="border" variant="light" />) : <>Add Video</>}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCourse;
