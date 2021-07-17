/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Dropdown, Form } from "react-bootstrap";
import "./searchPage.css";
import { _courses } from "../HomePage/data";
import { Course } from "../CourseList/courseList";
import PaginationCustom from "../Pagination/pagination";
import { useQuery } from "../../../services/useQuery";
import axios from "axios";
import config from "../../../configs/config.json";
import { useLocation, useParams } from "react-router";
import request from "../../../configs/request";

const sorts = [
  {
    name: "Rating Descending",
    value: "rating",
  },
  {
    name: "Price Ascending",
    value: "cost",
  },
];

function SearchPage() {
  const [filter, setFilter] = useState(null);
  const [filter1, setFilter1] = useState(null);
  const [courses, setCourses] = useState([]);
  const [active, setActive] = useState(1);
  const [numberPage, setNumberPage] = useState(1);
  const params = new URLSearchParams(window.location.search);
  const keyword  = params.get('keyword');
  const catId  = params.get('catId');
  const location = useLocation();


  useEffect(() => {
    if (keyword)
    {
      setFilter({ query: keyword, page: 1, limit: 10 });    
    }

    if (catId)
    {
      setFilter1({ categoryId: catId, page: 1, limit: 10 });  
    }
    setCourses([]);
  }, [location]);

  useEffect(() => {
    if (filter) loadCoursesBySearch();
  }, [filter]);
  
  useEffect(() => {
    if (filter1) loadCoursesByCatId();
  }, [filter1]);

  const onClickPageItem = (pageStr) => {
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

  const loadCoursesByCatId = async() => {

    const res = await request({
      url: '/courses',
      params: filter1,
      method: 'GET',
    });

    if (res.code)
    {
      if (res.data && res.data.rows.length > 0) {
          
          const newCourses = res.pageNumber === 1 ? [] : courses;
          setCourses(newCourses.concat(res.data.rows));
          setActive(res.pageNumber);
          setNumberPage(Math.floor(res.data.count / res.pageSize) + 1);
      }
    }
  };

  const loadCoursesBySearch = async() => {
    const res = await request({
      url: '/courses/search',
      params: filter,
      method: 'GET',
    });

    if (res.code)
    {
      if (res.data && res.data.rows.length > 0) {

          const newCourses = res.pageNumber === 1 ? [] : courses;
          setCourses(newCourses.concat(res.data.rows));
          setActive(res.pageNumber);
          setNumberPage(Math.floor(res.data.count / res.pageSize) + 1);
      }
    }
  };

  const onChangeOrder = (e) => {
    if (e) {

      if (catId)
      {
        setFilter1({
        ...filter1,
        sort: e.target.value,
        page: 1,
        });
        
      } else {
        setFilter({
        ...filter,
        sort: e.target.value,
        page: 1,
      });
      }
      
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
                <Course course={course} key={index} type="sale" />
              </div>
            );
          })}
      </div>
      {courses && courses.length === 0 && (
        <div className="text-not-found">Không tìm thấy kết quả phù hợp</div>
      )}
      {courses && courses.length > 0 && (
           <div className="flex-center mt-3">
        <PaginationCustom
          active={active}
          numberPage={numberPage}
          onClickPageItem={onClickPageItem}
        />
      </div>
      )}
      
    </>
  );
}

export default SearchPage;
