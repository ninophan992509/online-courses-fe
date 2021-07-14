import axios from "axios";
import jwt_decode from "jwt-decode";
const BASE_URL = "http://localhost:3000/api";

const checkExpireToken = (token) => {
  if (token)
  {
     const payload = jwt_decode(token);
     const { exp } = payload;
     if (Date.now() >= exp * 1000) {
       return true;
    }
    return false;
  }

  return true;
  
  
};

const refreshToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const data = {
    accessToken,
    refreshToken,
  };
   console.log(checkExpireToken(accessToken));
  if (checkExpireToken(accessToken)) {
    axios
      .request({
        url: `${BASE_URL}/refresh-token`,
        method: "POST",
        data,
      })
      .then((res) => {
        if (res.data.code) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
        }
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }
};

const { CancelToken } = axios;
let cancel;

const request = ({ url, method, data, params }) => {
  // if (cancel !== undefined) cancel();
  
  const token = localStorage.getItem("accessToken");
  const rfToken = localStorage.getItem("refreshToken");
  if (!url.match("auth") && token && rfToken) refreshToken();

  return axios({
    url: BASE_URL + url,
    method,
    data: data || {},
    params: params || {},
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${token || ""}`,
      "x-access-token": `${token}`,
    },

    // cancelToken: new CancelToken(function executor(c) {
    //   cancel = c;
    // }),
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request.data);
      } else {
        console.log("Error", error.message);
      }
      // if (axios.isCancel(error)) {
      //   console.log("Request canceled");
      // }
      throw error;
    });
};

export default request;
