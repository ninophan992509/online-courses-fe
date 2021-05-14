import React from "react";
import CourseList from "../CourseList/courseList";
import { settings4, settings5 } from "../../../configs/carousel-responsive";

const _courses = [
  {
    id: 1,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    teacher_id: 1,
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 339.99,
    sale_price: 229.99,
    image: null,
  },
  {
    id: 2,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    teacher_id: 1,
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 339.99,
    sale_price: 229.99,
    image: null,
  },
  {
    id: 3,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    teacher_id: 1,
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 339.99,
    sale_price: 229.99,
    image: null,
  },
  {
    id: 4,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    teacher_id: 1,
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 339.99,
    sale_price: null,
    image: null,
  },
  {
    id: 5,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    teacher_id: 1,
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 339.99,
    sale_price: 229.99,
    image: null,
  },
  {
    id: 6,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    teacher_id: 1,
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 339.99,
    sale_price: null,
    image: null,
  },
  {
    id: 7,
    name: "Complete Web Developer Training",
    teacher_name: "John Taylor",
    teacher_id: 1,
    category_name: "Web Development",
    rating: 4.5,
    students: 22301,
    price: 339.99,
    sale_price: 229.99,
    image: null,
  },
];

function HomePage() {
  return (
    <>
      <CourseList
        courses={_courses}
        settings={settings4}
        title={"Top outstanding courses"}
      />
      <CourseList
        courses={_courses}
        settings={settings5}
        title={"Top lasted courses"}
      />
      <CourseList
        courses={_courses}
        settings={settings5}
        title={"Top most viewed courses"}
      />
    </>
  );
}

export default HomePage;
