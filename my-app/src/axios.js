import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://localhost:8800/api/", 
    withCredentials: true,
});

// makeRequest.get("/test")
//     .then(res => console.log(res.headers))
//     .catch(err => console.error("Axios error:", err));