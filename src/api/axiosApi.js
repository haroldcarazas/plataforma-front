import axios from "axios";

// baseURL: "http://localhost:3000"
const axiosAPI = axios.create({
    baseURL: "https://plataforma-back-ng70.onrender.com/"
})

export default axiosAPI