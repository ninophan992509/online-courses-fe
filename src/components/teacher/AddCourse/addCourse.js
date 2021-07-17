import React, { useState, useRef, useCallback, useEffect,  } from "react";
import { Form, Spinner } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadFile from "../../../configs/firebaseConfig";
import "./addCourse.css";
import { useLoadCategories } from "../../guest/Header/useLoadCategories";
import request from "../../../configs/request";

function AddCourse() {
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    short_description: "",
    description: "",
    tuition_fee: 0,
    categoryId: 0,
    picture: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [preUrl, setPreUrl] = useState(null);
  const [subCats, setSubCats] = useState(null);
  const [filter, setFilter] = useState({});
  const [message, setMessage] = useState([]);
  const [upLoading, setUploading] = useState(false);
  const { loading, error, cats, hasMore, pageNumber } =
    useLoadCategories(filter);
  const history = useHistory();
  const observer = useRef();

  const getURL = (_url) => {
    if (_url) {
      setNewCourse({ ...newCourse, picture: _url });   
    } else {
      setUploading(false);
      alert('Error in uploading file. Please try again');
    }
    
  };

  useEffect(()=>{
     if(newCourse.picture && upLoading)
     {
        createNewCourse();
     }
  },[newCourse]);

  const createNewCourse= async() =>{
      try {
        const res = await request({
          method: "POST",
          url: `/courses`,
          data: newCourse,
        });

        if (res.code) {
          history.push("/dashboard");
        } 
      } catch (error) {
        alert('Error. Please try again');
      }
      setUploading(false);
  }

  const lastCategoryRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setFilter({
            ...filter,
            page: pageNumber + 1,
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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
      [name]: name === 'categoryId' || name === 'tuition_fee' ? +val: val,
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

    if (!thumbnail) {
      msg.push("The image course is required");
    }
    if (msg.length > 0) {
      setMessage(msg);
      return;
    } else {
      if (thumbnail) {
        if(newCourse.picture)
        {
          createNewCourse();
        }else{
          setUploading(true);
          uploadFile(thumbnail, getURL);
        }
        
      }
    }
  };

  return (
    <div className="box-wrapper new-course">
      <div className="title-heading">Create new course</div>
      <Form>
        <div className="row mb-3">
          <Form.Group className="col-md-6">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="The Complete 2021 Web Development Bootcamp"
              value={newCourse.course_name}
              onChange={(e) => onChangeValue(e, "course_name")}
            />
          </Form.Group>
          <Form.Group className="col-md-3">
            <Form.Label>Category</Form.Label>
            <select
              className="select-cat"
              aria-label="Select Category"
              onChange={(e) => onClickCatItem(e.target.value)}
            >
              <option disabled selected>
                Select Category
              </option>
              {cats &&
                cats.length > 0 &&
                cats.map((cat, index) => {
                  return (
                    <option value={cat.id} key={index}>
                      {cat.category_name}
                    </option>
                  );
                })}
            </select>
          </Form.Group>
          <Form.Group className="col-md-3">
            <Form.Label>SubCategory</Form.Label>
            <select
              className="select-cat"
              aria-label="Select Category"
              onChange={(e) => onChangeValue(e, "categoryId")}
            >
              <option disabled selected>
                Select SubCategory
              </option>
              {subCats &&
                subCats.length > 0 &&
                subCats.map((cat, index) => {
                  return (
                    <option value={cat.id} key={index}>
                      {cat.category_name}
                    </option>
                  );
                })}
            </select>
          </Form.Group>
        </div>
        <div className="row mb-3">
          <Form.Group className="col-md-8">
            <Form.Label>Short description</Form.Label>
            <Form.Control
              type="text"
              value={newCourse.short_description}
              onChange={(e) => onChangeValue(e, "short_description")}
              placeholder="Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!"
            />
          </Form.Group>
          <Form.Group className="col-md-4">
            <Form.Label>Tuition Fee</Form.Label>
            <Form.Control
              type="number"
              value={newCourse.tuition_fee}
              onChange={(e) => onChangeValue(e, "tuition_fee")}
              placeholder="20"
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
            {!upLoading && (
               <>Tạo khóa học</>
            )}
            {upLoading && (
              <Spinner animation="border" variant="light" size="sm" />
            )}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AddCourse;
