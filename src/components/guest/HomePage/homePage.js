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
        url: `/courses/${url}`,
        method: "GET",
      });

      if (res.status === 200) {
        setList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //fetchData({ url: "newest", setList: setLastedCourses });
    fetchData({ url: "highlights", setList: setBestCourses });
    //fetchData({ url: "most-views", setList: setViewedCourses });
  }, []);
  return (
    <>
      <CourseList
        courses={bestCourses}
        settings={settings4}
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
      />
      <CourseList
        courses={viewedCourses}
        settings={settings4}
        title={"Top most viewed courses"}
      />
    </>
  );
}

export default HomePage;
