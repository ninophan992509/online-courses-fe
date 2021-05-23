import React, { useState } from "react";
import CourseList from "../CourseList/courseList";
import CatList from "../CatList/catList";
import { settings4, settings5 } from "../../../configs/carousel-responsive";
import { _courses, _cats } from "./data";


function HomePage() {
  const [bestCourses, setBestCourses] = useState(_courses);
  const [lastedCourses, setLastedCourses] = useState(_courses);
  const [viewedCourses, setViewedCourses] = useState(_courses);
  const [bestCats, setBestCats] = useState(_cats);

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
        settings={settings5}
        title={"Top lasted courses"}
      />
      <CourseList
        courses={viewedCourses}
        settings={settings5}
        title={"Top most viewed courses"}
      />
    </>
  );
}

export default HomePage;
