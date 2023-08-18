import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_TMDB_API_BASE_URL,
  params: { api_key: process.env.NEXT_PUBLIC_APP_TMDB_API_KEY },
});

export default axiosInstance;
