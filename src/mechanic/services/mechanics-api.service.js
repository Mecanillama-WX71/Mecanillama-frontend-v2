import http from "../../core/services/http-common";

export class MechanicsProfileApiService {
  getAll() {
    return http.get("/mechanics");
  }
  getById(id) {
    return http.get(`/mechanics/${id}`);
  }
  getByUserId(id) {
    return http.get(`/mechanics/uid/${id}`);
  }
  create(data) {
    return http.post("/mechanics", data);
  }
  update(id, data) {
    return http.put(`/mechanics/${id}`, data);
  }
  delete(id) {
    return http.delete(`/mechanics/${id}`);
  }

}
