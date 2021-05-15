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
                <li className="cat-item">
                  <Link className="cat-link" to={`/category?id=${cat.id}`}>
                    <div className="cat-name">{cat.name}</div>
                    <div className="cat-students">
                      <span>{numeral(cat.students).format("000,000,000")}</span>
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
