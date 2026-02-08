import { axiosInstance } from "../../../../http-common.js";

class NotesServices {

  getAllNotes(page = 1) {
    return axiosInstance.get(
      `/api/v1/profiles/person-notes/?page=${page}`
    );
  }

  searchNotes(query, page = 1) {
    return axiosInstance.get(
      `/api/v1/profiles/person-notes/?q=${query}&page=${page}`
    );
  }

  serachForPerson(value) {
    return axiosInstance.get(
      `/api/v1/profiles/accounts/search-dropdown/?q=${value}`
    );
  }

  addNotes(value) {
    return axiosInstance.post(
      `/api/v1/profiles/person-notes/`,
      value
    );
  }

}

export default new NotesServices();
