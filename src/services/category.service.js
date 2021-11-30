import { request } from "./api.service";

const getCategories = () => request({ url: "category", method: "get" });

export { getCategories };
