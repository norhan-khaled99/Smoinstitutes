import { axiosInstance } from "../../../../http-common.js";

class StaffServices {




  getAllStaff(page, type, value, searchQuery) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/profiles/staff/search/?${type}=${value}&page=${page}`,
      );
    } else if (searchQuery) {
      return axiosInstance.get(
        `/api/v1/profiles/staff/search/?q=${searchQuery}&page=${page}`,
      );
    } else {
      return axiosInstance.get(`/api/v1/profiles/staff/?page=${page}`);
    }
  }


  getAlljob() {
    return axiosInstance.get(`/api/v1/profiles/jobstypes/`);
  }

  getInstitution() {
    return axiosInstance.get(`/api/v1/profiles/institution/`);
  }

  getAllCites() {
    return axiosInstance.get(
      `/api/v1/auth/lookups/?key=person.city_choices`
    );
  }


  getStaffData(staffID) {
    return axiosInstance.get(
      `/api/v1/profiles/staff/${staffID}/profile`
    );
  }


  addStaff(value) {
    return axiosInstance.post(`/api/v1/profiles/staff/`, value);
  }

  updateStaff(value, staffID) {
    return axiosInstance.put(`/api/v1/profiles/staff/${staffID}/`, value);
  }

}

export default new StaffServices();
