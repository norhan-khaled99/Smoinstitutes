import { axiosInstance } from "../../../../http-common.js";

class BookStockServices {
  // getAllBookStock(page = 1) {
  //   return axiosInstance.get(
  //     `/api/v1/courses/books-stock/?page=${page}`
  //   );
  // }

  getlevelOptions() {
    return axiosInstance.get(`/api/v1/courses/books-stock/levels`);
  }

  getByUserOptions() {
    return axiosInstance.get(`/api/v1/courses/books-stock/users`);
  }

  searchBookStock(query, page = 1) {
    return axiosInstance.get(`/api/v1/courses/books-stock/?q=${query}&page=${page}`);
  }


  getAllBookStock(page, type, value) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/courses/books-stock/search/?${type}=${value}&page=${page}`,
      );
    } else {
      return axiosInstance.get(`/api/v1/courses/books-stock/?page=${page}`);
    }
  }

  addBookStock(value) {
    return axiosInstance.post(`/api/v1/courses/books-stock/`, value);
  }
}

export default new BookStockServices();
