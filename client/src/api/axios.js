import axios from "axios";

const fetchClient = () => {
    const defaultOptions = {
        // baseURL: "http://kra.n1.iworklab.com:3006",
        baseURL: "http://localhost:3006",
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("jwtToken");
        config.headers.Authorization = token ? `${token}` : "";
        return config;
    });

    return instance;
};

export default fetchClient();