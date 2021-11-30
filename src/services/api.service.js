import axios from "axios";

const API_URL = "http://localhost:3000/api";

const request = ({ url, method, data = {} }) => {
  return axios[method](`${API_URL}/${url}`, data);
};

export { request };
