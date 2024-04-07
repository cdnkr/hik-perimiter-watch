import axios from "axios";

const protocol = "http://";

const api = axios.create({
    baseURL: `${protocol}${process.env.REACT_APP_API_URL}`,
});

export {
    api
};