import axios from "axios";
import { API_VIDEOS_URL } from "../config/config";

const axiosAPI = axios.create({
    baseURL: API_VIDEOS_URL
})

export default axiosAPI