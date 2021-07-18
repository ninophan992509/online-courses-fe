import React from "react";
import { Link } from "react-router-dom";
import "./catList.css";
import numeral from "numeral";

function CatList({ categories, title }) {
  return (
    <>
      {title && <div className="list-title">{title}</div>}
      <div className="box-wrapper cat-wrap-list">
        <ul className="cat-list">
          {categories &&
            categories.length > 0 &&
            categories.map((cat, index) => {
              return (
                <li className="cat-item" key={index}>
                  <Link className="cat-link" to={`/courses/search?catId=${cat.id}`}>
                    <div className="cat-name">{cat.category_name}{` ${numeral(cat.number_enrolled).format("0,0")}`}</div>
                    <div className="cat-students">
                      <span>
                        {numeral(cat.numberEnrollThisWeek).format("0,0")}
                      </span>
                      {" participants"}
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default CatList;
