export default class AuthenticateResponse {
  constructor(id, email, token) {
    this.id = id;
    this.email = email;
    this.token = token;
  }
}
