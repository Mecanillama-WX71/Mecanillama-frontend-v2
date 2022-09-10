import axios from "axios";

//API runs in port 3000, consider this for all services.js

export default axios.create({
    baseURL: 'https://localhost:7056/api/v1/',
    headers: { 'Content-type': 'application/json' }
})