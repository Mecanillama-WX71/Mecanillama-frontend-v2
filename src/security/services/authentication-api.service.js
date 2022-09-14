import axios from "axios";
import http from "../../core/services/http-common";


const API_URL = "https://wx71-mecanillama.azurewebsites.net/api/v1/users";
const USER_KEY = "user";

class AuthenticationApiService {
  signIn(request) {
    return axios.post(`${API_URL}/sign-in`, request).then((response) => {
      if (response.data.token) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  signUp(request) {
    return axios.post(`${API_URL}/sign-up`, request);
  }

  signOut() {
    localStorage.removeItem("user");
  }

  iniciar(email, password) {
    return axios.post(`${API_URL}/sign-in`, {
      email: email,
      password: password,
    });
  }

  mostrar(token){
    return axios.get(API_URL, { headers: { 'Authorization': `Bearer ${token}`}});
  }
}
export default new AuthenticationApiService();

