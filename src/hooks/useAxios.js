import axios from "axios";

const isProduction = import.meta.env.PROD;

const axiosInstance = axios.create({
  baseURL: isProduction
    ? import.meta.env.BASE_URL
    : "http://localhost:3001",
});

const useAxios = () => {
  const get = (url) => {
    if (isProduction && url === "/events") {
      return axiosInstance.get("events.json");
    }
    return axiosInstance.get(url);
  };

  const post = (url, data) => {
    if (isProduction) {
      console.warn("GitHub Pages is a static site host and does not support POST requests.");
      return Promise.resolve({data});
    }
    return axiosInstance.post(url, data);
  };

  const patch = (url, data) => {
    if (isProduction) {
      console.warn("GitHub Pages is a static site host and does not support PATCH requests.");
      return Promise.resolve({ datab });
    }
    return axiosInstance.patch(url, data);
  };
  
  return { get, post, patch };
};

export default useAxios;
