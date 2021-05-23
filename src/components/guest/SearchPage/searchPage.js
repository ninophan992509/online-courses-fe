import React, { useState, useEffect } from "react";
import { Dropdown, Form } from "react-bootstrap";
import "./searchPage.css";
import { _courses } from "../HomePage/data";
import { Course } from "../CourseList/courseList";
import PaginationCustom from "../Pagination/pagination";
import { useQuery } from "../../../services/useQuery";
import axios from "axios";
import config from "../../../configs/config.json";
import { useParams } from "react-router";
const sorts = [
  {
    name: "Rating Descending",
    value: "rating",
  },
  {
    name: "Price Ascending",
    value: "price",
  },
];

function SearchPage() {
  const [filter, setFilter] = useState(null);
  const [courses, setCourses] = useState(_courses);
  const [active, setActive] = useState(1);
  const [numberPage, setNumberPage] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setFilter({
        cat_id: id,
      });
    }
  }, [id]);

  useEffect(() => {
    // if (filter) loadResult();
  }, [filter]);

  const onClickPageItem = (pageStr) => {
    alert(pageStr);
    if (pageStr === "+1") {
      setFilter({
        ...filter,
        page: active + 1,
      });
    } else if (pageStr === "-1") {
      setFilter({
        ...filter,
        page: active - 1,
      });
    } else {
      setFilter({
        ...filter,
        page: +pageStr,
      });
    }
  };

  const loadResult = () => {
    axios
      .get(`${config.API_URL}/courses`, { params: filter })
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.courses);
          setActive(res.courses.page);
          setNumberPage(res.courses.pages);
        } else {
          throw Error();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeOrder = (e) => {
    if (e) {
      alert(e.target.value);
      setFilter({
        ...filter,
        order: e.target.value,
        page: 1,
      });
    }
  };

  return (
    <>
      <div className="w-100">
        <Form.Group className="select-sort">
          <Form.Control as="select" onChange={(e) => onChangeOrder(e)}>
            <option disabled selected>
              Sort
            </option>
            {sorts &&
              sorts.map((sort, index) => {
                return (
                  <option value={sort.value} key={index}>
                    {sort.name}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>
      </div>
      <div className="list-search">
        {courses &&
          courses.map((course, index) => {
            return (
              <div className="card-wrap-item">
                <Course course={course} key={index} />
              </div>
            );
          })}
      </div>
      <div className="flex-center mt-3">
        <PaginationCustom
          active={active}
          numberPage={numberPage}
          onClickPageItem={onClickPageItem}
        />
      </div>
    </>
  );
}

export default SearchPage;
