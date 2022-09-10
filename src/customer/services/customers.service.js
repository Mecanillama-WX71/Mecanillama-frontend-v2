import http from "../../core/services/http-common";

export class CustomersApiService {
    getAll() {
        return http.get("/customers");
      }
    getByUserId(userId) {
        return http.get(`/customers/uid/${ userId }`);
    }
}