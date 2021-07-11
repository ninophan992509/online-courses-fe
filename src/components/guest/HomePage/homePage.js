import React, { useState, useEffect } from "react";
import CourseList from "../CourseList/courseList";
import CatList from "../CatList/catList";
import { settings4 } from "../../../configs/carousel-responsive";
import { _courses, _cats } from "./data";
import request from "../../../configs/request";
import config from "../../../configs/config.json";
import axios from "axios";

function HomePage() {
  const [bestCourses, setBestCourses] = useState([]);
  const [lastedCourses, setLastedCourses] = useState([]);
  const [viewedCourses, setViewedCourses] = useState([]);
  const [bestCats, setBestCats] = useState([]);

  const fetchData = async (url) => {
    return axios({
      url: `${config.API_URL}${url}`,
      method:'GET',
      withCredentials: false,
      headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  };

  useEffect(() => {
    Promise.all([
      fetchData( "/courses/newest"),
      fetchData( "/courses/highlights"),
      fetchData( "/courses/most-views"),
      fetchData("/categories/most-enroll-this-week")
    ]).then(async ([res1, res2, res3, res4]) => {

      if (res1.data.data)
      {
        setLastedCourses(res1.data.data);
      }
         
      if (res2.data.data)
      {
        setBestCourses(res2.data.data);
      }
      
      if (res3.data.data)
      {
        setViewedCourses(res3.data.data);
      }

      if (res4.data.data)
      {
        setBestCats(res4.data.data);
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
