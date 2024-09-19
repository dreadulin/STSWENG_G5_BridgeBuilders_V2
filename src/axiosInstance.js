import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}`;
console.log('Axios baseURL:', baseURL);

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
