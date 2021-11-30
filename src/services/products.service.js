import { request } from "./api.service";

const getProducts = () => request({ url: "product", method: "get" });
const getProduct = id => request({ url: `product/${id}`, method: "get" });
const getProductCategory = id =>
  request({ url: "product/productwithcategory", method: "post", data: { id } });

export { getProducts, getProduct, getProductCategory };
