import { axiosInstance } from "../../../../http-common.js";

class BookStockServices {


  getlevelOptions() {
    return axiosInstance.get(`/api/v1/courses/books-stock/levels`);
  }

  getByUserOptions() {
    return axiosInstance.get(`/api/v1/courses/books-stock/users`);
  }

  searchBookStock(query, page = 1) {
    return axiosInstance.get(`/api/v1/courses/books-stock/?q=${query}&page=${page}`);
  }


  getAllBookStock(page, filters = {}) {
    const params = new URLSearchParams({ page: String(page) });
    const { direction, level, byUser, searchQuery } = filters;

    if (searchQuery) {
      params.set("q", searchQuery);
    }
    if (direction != null && direction !== "") {
      params.set("direction", direction);
    }
    if (level != null && level !== "") {
      params.set("level", level);
    }
    if (byUser != null && byUser !== "") {
      params.set("by_user", byUser);
    }

    const query = params.toString();
    const url = query
      ? `/api/v1/courses/books-stock/?${query}`
      : `/api/v1/courses/books-stock/?page=${page}`;
    return axiosInstance.get(url);
  }

  addBookStock(value) {
    return axiosInstance.post(`/api/v1/courses/books-stock/`, value);
  }
}

export default new BookStockServices();
