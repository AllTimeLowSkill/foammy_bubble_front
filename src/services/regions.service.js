import { request } from "./api.service";
import axios from "axios";

const getRegions = () => request({ url: "regions", method: "get" });
const addDelivery = data => request({ url: "delivery", method: "post", data });

export { getRegions, addDelivery };
