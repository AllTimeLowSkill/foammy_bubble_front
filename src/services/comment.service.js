import { request } from "./api.service";

const getComments = id => request({ url: `comment/${id}`, method: "get" });
const createComments = data =>
  request({ url: "comment", method: "post", data });
const updateComment = data => request({ url: "comment", method: "put", data });

export { getComments, createComments, updateComment };
