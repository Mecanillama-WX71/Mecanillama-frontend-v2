import axios from "axios";
import http from "../../core/services/http-common";

const API_URL = "https://wx71-mecanillama.azurewebsites.net/api/v1/users";
const API_URL_SIGNUP = "https://wx71-mecanillama.azurewebsites.net/api/v1/users/sign-up";
const API_URL_SIGNIN = "https://wx71-mecanillama.azurewebsites.net/api/v1/users/sign-in";
const API_URL_ADD_CUSTOMER = "https://wx71-mecanillama.azurewebsites.net/api/v1/customers";
const API_URL_ADD_MECHANIC = "https://wx71-mecanillama.azurewebsites.net/api/v1/mechanics";
// todo agregar url para customer y mechanic

class AuthService {
  signUp(user) {
    return http.post(API_URL_SIGNUP, user);
  }

  signIn(user) {
    return http.post(API_URL_SIGNIN, user);
  }
  postCustomer(customer) {
    return http.post(API_URL_ADD_CUSTOMER, customer);
  }
  postMechanic(mechanic) {
    return http.post(API_URL_ADD_MECHANIC, mechanic);
  }
  // Get Current User
  getCurrentUser() {
    return localStorage.getItem("user");
  }
  mostrar(token){
    return axios.get(API_URL, { headers: { 'Authorization': `Bearer ${token}`}});
  }
}
export default new AuthService();
