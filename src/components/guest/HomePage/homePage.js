import React, { useState } from "react";
import CourseList from "../CourseList/courseList";
import CatList from "../CatList/catList";
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

const _cats = [
  {
    id: 1,
    name: "Design",
    students: 656300,
  },
  {
    id: 2,
    name: "Development",
    students: 556300,
  },
  {
    id: 3,
    name: "Marketing",
    students: 456300,
  },
  {
    id: 4,
    name: "IT and software",
    students: 356300,
  },
  {
    id: 5,
    name: "Personal Development",
    students: 256300,
  },
  {
    id: 6,
    name: "Business",
    students: 156300,
  },
  {
    id: 7,
    name: "Photography",
    students: 56300,
  },
  {
    id: 8,
    name: "Music",
    students: 6300,
  },
];

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
