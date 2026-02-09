import { axiosInstance } from "../../../../http-common.js";

class ProfileServices {


  getAllProfiles(page, type, value) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/profiles/accounts/search/?${type}=${value}&page=${page}`,
      );
    } else {
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

  searchProfiles(query, page = 1) {
    return axiosInstance.get(
      `/api/v1/profiles/accounts/search/?q=${query}&page=${page}`
    );
  }




  addProfile(value) {
    return axiosInstance.post(
      `/api/v1/profiles/accounts/`,
      value
    );
  }


   updateProfile(value) {
    return axiosInstance.put(
      `/api/v1/profiles/accounts/`,
      value
    );
  }

}

export default new ProfileServices();
