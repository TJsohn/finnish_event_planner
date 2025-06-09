import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

const useAxios = () => {
  const get = (url) => axiosInstance.get(url);
  const post = (url, data) => axiosInstance.post(url, data);
  const patch = (url, data) => axiosInstance.patch(url, data);
  return { get, post, patch };
};

export default useAxios;
