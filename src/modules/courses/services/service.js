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



  serachForLevels(value) {
    return axiosInstance.get(
      `/api/v1/courses/levels/lookup/?q=${value}`
    );
  }


  getAllShifts() {
    return axiosInstance.get(
      `/api/v1/auth/lookups/?key=course.shifts`
    );
  }

  getNextCourseSerial() {
    return axiosInstance.get(
      `/api/v1/courses/profile/next-serial`
    );
  }

  searchCourses(query, page = 1) {
    return axiosInstance.get(
      `/api/v1/courses/profile/?q=${query}&page=${page}`
    );
  }




  addCourse(value) {
    return axiosInstance.post(
      `/api/v1/courses/profile/`,
      value
    );
  }


  //  updateProfile(value,id) {
  //   return axiosInstance.put(
  //     `/api/v1/profiles/accounts/${id}/`,
  //     value
  //   );
  // }

}

export default new CoursesServices();
