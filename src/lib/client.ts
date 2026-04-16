import axios from "axios";

const timeout = 1000 * 60;

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
    "X-TENANT-ID": "dms",
  },
  timeout,
});

export default client;
