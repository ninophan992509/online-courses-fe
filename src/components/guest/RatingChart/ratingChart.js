import React from "react";
import Rating from "react-rating";
import { Table } from "react-bootstrap";
import { TiStarFullOutline } from "react-icons/ti";
import "./ratingChart.css";
import styled from "styled-components";

const RectangleFill = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
`;

function RatingChart({ chart, total }) {
  const calcPoint = (ratings, total) => {
    return Math.floor(((ratings / total) * 100 * 5) / 100);
  };

  const calcPercent = (ratings, total) => {
    return Math.floor((ratings / total) * 100);
  };

  return (
    <Table responsive className="table-rating-chart">
      <tbody>
        <tr>
          <td colSpan="2">
            {`5 `}
            {<TiStarFullOutline />}
          </td>
          <td colSpan="8">
            <Rating
              emptySymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#E7E7E7"
                />
              }
              fullSymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#57E32C"
                />
              }
              readonly
              initialRating={calcPoint(chart[4].ratings, total)}
            />
          </td>
          <td colSpan="2">{`${calcPercent(chart[4].ratings, total)}%`}</td>
        </tr>
        <tr>
          <td colSpan="2">
            {`4 `}
            {<TiStarFullOutline />}
          </td>
          <td colSpan="8">
            <Rating
              emptySymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#E7E7E7"
                />
              }
              fullSymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#B7DD29"
                />
              }
              readonly
              initialRating={calcPoint(chart[3].ratings, total)}
            />
          </td>
          <td colSpan="2">{`${calcPercent(chart[3].ratings, total)}%`}</td>
        </tr>
        <tr>
          <td colSpan="2">
            {`3 `}
            {<TiStarFullOutline />}
          </td>
          <td colSpan="8">
            <Rating
              emptySymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#E7E7E7"
                />
              }
              fullSymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#FFE234"
                />
              }
              readonly
              initialRating={calcPoint(chart[2].ratings, total)}
            />
          </td>
          <td colSpan="2">{`${calcPercent(chart[2].ratings, total)}%`}</td>
        </tr>
        <tr>
          <td colSpan="2">
            {`2 `}
            {<TiStarFullOutline />}
          </td>
          <td colSpan="8">
            <Rating
              emptySymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#E7E7E7"
                />
              }
              fullSymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#FFA534"
                />
              }
              readonly
              initialRating={calcPoint(chart[1].ratings, total)}
            />
          </td>
          <td colSpan="2">{`${calcPercent(chart[1].ratings, total)}%`}</td>
        </tr>
        <tr>
          <td colSpan="2">
            {`1 `}
            {<TiStarFullOutline />}
          </td>
          <td colSpan="8">
            <Rating
              emptySymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#E7E7E7"
                />
              }
              fullSymbol={
                <RectangleFill
                  width="9vw"
                  height="20px"
                  backgroundColor="#FF4545"
                />
              }
              readonly
              initialRating={calcPoint(chart[0].ratings, total)}
            />
          </td>
          <td colSpan="2">{`${calcPercent(chart[0].ratings, total)}%`}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default RatingChart;
