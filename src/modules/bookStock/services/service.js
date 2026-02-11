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


  getAllBookStock(page, type, value , searchQuery) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/courses/books-stock/search/?${type}=${value}&page=${page}`,
      );
    }
    else if (searchQuery) {
      return axiosInstance.get(
        `/api/v1/courses/books-stock/?q=${searchQuery}&page=${page}`
      );
    }else {
      return axiosInstance.get(`/api/v1/courses/books-stock/?page=${page}`);
    }
  }

  addBookStock(value) {
    return axiosInstance.post(`/api/v1/courses/books-stock/`, value);
  }
}

export default new BookStockServices();
