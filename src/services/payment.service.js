import { request } from "./api.service";

const paymentIntent = data => request({ url: "order", method: "post", data });
const successBuy = data =>
  request({ url: "order/success", method: "post", data });

export { paymentIntent, successBuy };
