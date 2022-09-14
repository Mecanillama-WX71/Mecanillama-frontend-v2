import axios from "axios";
import authHeader from "./auth.header";

const API_URL = 'https://wx71-mecanillama.azurewebsites.net/api/v1/users'
export default class UserApiService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader()});
  }
}
