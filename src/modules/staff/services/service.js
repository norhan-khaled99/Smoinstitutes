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

  // serachForTeacher(value) {
  //   return axiosInstance.get(
  //     `/api/v1/profiles/staff/search-dropdown/?q=${value}`,
  //   );
  // }

  getAlljob() {
    return axiosInstance.get(`/api/v1/profiles/jobstypes/`);
  }

  getInstitution() {
    return axiosInstance.get(`/api/v1/profiles/institution/`);
  }

  // serachForLevels(value) {
  //   return axiosInstance.get(`/api/v1/courses/levels/lookup/?q=${value}`);
  // }

  // getAllShifts() {
  //   return axiosInstance.get(`/api/v1/auth/lookups/?key=course.shifts`);
  // }



  // getCourceData(courseId) {
  //   return axiosInstance.get(`/api/v1/courses/profile/${courseId}`);
  // }

  // addCourse(value) {
  //   return axiosInstance.post(`/api/v1/courses/profile/`, value);
  // }

  // updateCourse(value, id) {
  //   return axiosInstance.put(`/api/v1/courses/profile/${id}/`, value);
  // }


  // updateScores(value, id) {
  //   return axiosInstance.post(`/api/v1/courses/profile/${id}/update-scores/`, value);
  // }

  // executeAction(action, courseId) {
  //   const url = action.link.replace("#", courseId);
  //   const config = {
  //     responseType: "arraybuffer",
  //   };
  //   if (action.method === "GET") {
  //     return axiosInstance.get(url, config);
  //   } else if (action.method === "POST") {
  //     return axiosInstance.post(url, {}, config);
  //   } else if (action.method === "PUT") {
  //     return axiosInstance.put(url, {}, config);
  //   } else if (action.method === "DELETE") {
  //     return axiosInstance.delete(url, config);
  //   }
  // }
}

export default new StaffServices();
