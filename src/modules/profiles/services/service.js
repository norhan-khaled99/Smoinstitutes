import { axiosInstance } from "../../../../http-common.js";

class ProfileServices {


  getAllProfiles(page, type, value, searchQuery) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/profiles/accounts/search/?${type}=${value}&page=${page}`,
      );
    }
    else if (searchQuery) {
      return axiosInstance.get(
        `/api/v1/profiles/accounts/search/?q=${searchQuery}&page=${page}`
      );
    }
    else {
      return axiosInstance.get(`/api/v1/profiles/accounts/?page=${page}`);
    }
  }








  getAllAccountType() {
    return axiosInstance.get(
      `/api/v1/auth/lookups/main-accounts`
    );
  }

  getAllCites() {
    return axiosInstance.get(
      `/api/v1/auth/lookups/?key=person.city_choices`
    );
  }






  addProfile(value) {
    return axiosInstance.post(
      `/api/v1/profiles/accounts/`,
      value
    );
  }


   updateProfile(value,id) {
    return axiosInstance.put(
      `/api/v1/profiles/accounts/${id}/`,
      value
    );
  }

}

export default new ProfileServices();
