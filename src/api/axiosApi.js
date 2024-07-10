import axios from "axios";
import { API_URL } from "../config/config";

const axiosAPI = axios.create({
    baseURL: API_URL
})

export default axiosAPI