import { request } from "./api.service";

const signIn = data => request({ url: "user/signin", method: "post", data });
const signUp = data => request({ url: "user/signup", method: "post", data });
const updateUser = data => request({ url: `user/update`, method: "put", data });

export { signIn, signUp, updateUser };
