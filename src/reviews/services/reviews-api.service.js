import http from "../../core/services/http-common";

export class ReviewsApiService {
  getAll() {
    return http.get("/reviews");
  }
  getById(id) {
    return http.get(`/reviews/${id}`);
  }
  create(data) {
    return http.post("/reviews", data);
  }
  update(id, data) {
    return http.put(`/reviews/${id}`, data);
  }
  delete(id) {
    return http.delete(`/reviews/${id}`);
  }
  findByMechanicId(postId) {
    return http.get(`/reviews?mechanicId=${postId}`);
  }
}
