import http from "../../core/services/http-common";

export class MechanicsApiService {
    getAll() {
        return http.get("/mechanics");
      }
    getByUserId(userId) {
        return http.get(`/mechanics/${ userId }`);
    }
}