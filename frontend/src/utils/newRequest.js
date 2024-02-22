import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://127.0.0.1:8000/api/"
    : "http://127.0.0.1:8000/api/";

console.log(
  "%c⚙️ Server running in ",
  "color: orange; font-weight: bold; background-color: black; padding: 4px;",
  process.env.NODE_ENV + " mode"
);

const newRequest = axios.create({
  baseURL,
});

export default newRequest;
