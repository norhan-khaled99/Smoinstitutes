import { axiosInstance } from "../../../../http-common.js";

class NotesServices {
  getAllNotes(page = 1, searchQuery) {
    if (searchQuery) {
      return axiosInstance.get(
        `/api/v1/profiles/person-notes/?q=${searchQuery}&page=${page}`,
      );
    } else {
      return axiosInstance.get(`/api/v1/profiles/person-notes/?page=${page}`);
    }
  }

 

  serachForPerson(value) {
    return axiosInstance.get(
      `/api/v1/profiles/accounts/search-dropdown/?q=${value}`,
    );
  }

  addNotes(value) {
    return axiosInstance.post(`/api/v1/profiles/person-notes/`, value);
  }
}

export default new NotesServices();
