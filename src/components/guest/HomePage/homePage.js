import React, { useState, useEffect } from "react";
import CourseList from "../CourseList/courseList";
import CatList from "../CatList/catList";
import { settings4 } from "../../../configs/carousel-responsive";
import { _courses, _cats } from "./data";
import request from "../../../configs/request";

function HomePage() {
  const [bestCourses, setBestCourses] = useState(_courses);
  const [lastedCourses, setLastedCourses] = useState(_courses);
  const [viewedCourses, setViewedCourses] = useState(_courses);
  const [bestCats, setBestCats] = useState(_cats);

  const fetchData = async (url) => {
      return await request({
        url,
        method: "GET",
      });
  };

  useEffect(() => {
    Promise.all([
      fetchData( "/courses/newest"),
      fetchData( "/courses/highlights"),
      fetchData( "/courses/most-views"),
      fetchData("/categories/most-enroll-this-week")
    ]).then(async([res1, res2, res3, res4]) => {
      if (res1.data && res1.data.rows)
      {
        setLastedCourses(res1.data.rows);
      }
      
      if (res2.data && res2.data.rows)
      {
        setBestCourses(res2.data.rows);
      }
      
      if (res3.data && res3.data.rows)
      {
        setViewedCourses(res1.data.rows);
      }
      
      if (res4.data)
      {
        setViewedCourses(res1.data);
      }

    }).catch(error => {
      console.log(error);
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
