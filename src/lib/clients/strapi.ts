import axios from "axios";

const strapiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default strapiClient;
