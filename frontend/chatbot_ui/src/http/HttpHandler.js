import axios from "axios";


// Create a reusable HTTP client
const httpHandler = axios.create({
    baseURL: "http://127.0.0.1:8000", // Replace with your API base URL
    headers: {
        "Content-Type": "application/json"
      } 
});

// Add a request interceptor to include the Bearer token
httpHandler.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage, or state management
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



httpHandler.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/auth";
        }
        console.error("HTTP Handler Error:", error);
        return Promise.reject(error);
    }
);

export default httpHandler;