import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

const request = ({ url, method, data, params }) => {
  return axios({
    url: BASE_URL + url,
    method,
    data,
    params,
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export default request;
