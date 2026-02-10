import { axiosInstance } from "../../../../http-common.js";

class CoursesServices {


  getAllCourses(page, type, value) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/courses/profile/?${type}=${value}&page=${page}`,
      );
    } else {
      return axiosInstance.get(`/api/v1/courses/profile/?page=${page}`);
    }
  }


  getAllTeachers() {
    return axiosInstance.get(
      `/api/v1/courses/profile/teachers`
    );
  }


  getAllLevels() {
    return axiosInstance.get(
      `/api/v1/courses/levels/`
    );
  }


  getAllShifts() {
    return axiosInstance.get(
      `/api/v1/auth/lookups/?key=course.shifts`
    );
  }

  // getAllCites() {
  //   return axiosInstance.get(
  //     `/api/v1/auth/lookups/?key=person.city_choices`
  //   );
  // }

  // searchProfiles(query, page = 1) {
  //   return axiosInstance.get(
  //     `/api/v1/profiles/accounts/search/?q=${query}&page=${page}`
  //   );
  // }




  // addProfile(value) {
  //   return axiosInstance.post(
  //     `/api/v1/profiles/accounts/`,
  //     value
  //   );
  // }


  //  updateProfile(value,id) {
  //   return axiosInstance.put(
  //     `/api/v1/profiles/accounts/${id}/`,
  //     value
  //   );
  // }

}

export default new CoursesServices();
