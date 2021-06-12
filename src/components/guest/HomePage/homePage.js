import React, { useState, useEffect } from "react";
import CourseList from "../CourseList/courseList";
import CatList from "../CatList/catList";
import { settings4, settings5 } from "../../../configs/carousel-responsive";
import { _courses, _cats } from "./data";
import request from "../../../configs/request";

function HomePage() {
  const [bestCourses, setBestCourses] = useState(_courses);
  const [lastedCourses, setLastedCourses] = useState(_courses);
  const [viewedCourses, setViewedCourses] = useState(_courses);
  const [bestCats, setBestCats] = useState(_cats);

  const fetchData = async ({ url, setList }) => {
    try {
      const res = await request({
        url: `/${url}`,
        method: "GET",
      });

      console.log(res);

      if (res.data.code) {
        setList(res.data.data.rows ? res.data.data.rows: res.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData({ url: "courses/newest", setList: setLastedCourses });
    fetchData({ url: "courses/highlights", setList: setBestCourses });
    fetchData({ url: "courses/most-views", setList: setViewedCourses });
    fetchData({
      url: "categories/most-enroll-this-week",
      setList: setBestCats,
    });
  }, []);
  return (
    <>
      <CourseList
        courses={bestCourses}
        settings={settings4}
        type="sale"
        title={"Top outstanding courses"}
      />
      <CatList
        categories={bestCats}
        title={"Top most categories chosen by students in the week"}
      />
      <CourseList
        courses={lastedCourses}
        settings={settings4}
        title={"Top lasted courses"}
        type="sale"
      />
      <CourseList
        courses={viewedCourses}
        settings={settings4}
        title={"Top most viewed courses"}
        type="sale"
      />
    </>
  );
}

export default HomePage;
