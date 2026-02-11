import { axiosInstance } from "../../../../http-common.js";

class CoursesServices {
  getAllCourses(page, type, value, searchQuery) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/courses/profile/?${type}=${value}&page=${page}`,
      );
    } else if (searchQuery) {
      return axiosInstance.get(
        `/api/v1/courses/profile/?q=${searchQuery}&page=${page}`,
      );
    } else {
      return axiosInstance.get(`/api/v1/courses/profile/?page=${page}`);
    }
  }

  serachForTeacher(value) {
    return axiosInstance.get(
      `/api/v1/profiles/staff/search-dropdown/?q=${value}`,
    );
  }

  getAllTeachers() {
    return axiosInstance.get(`/api/v1/courses/profile/teachers`);
  }

  serachForLevels(value) {
    return axiosInstance.get(`/api/v1/courses/levels/lookup/?q=${value}`);
  }

  getAllShifts() {
    return axiosInstance.get(`/api/v1/auth/lookups/?key=course.shifts`);
  }

  getNextCourseSerial() {
    return axiosInstance.get(`/api/v1/courses/profile/next-serial`);
  }

  getCourceData(courseId) {
    return axiosInstance.get(`/api/v1/courses/profile/${courseId}`);
  }

  addCourse(value) {
    return axiosInstance.post(`/api/v1/courses/profile/`, value);
  }

  updateCourse(value, id) {
    return axiosInstance.put(`/api/v1/courses/profile/${id}/`, value);
  }

  executeAction(action, courseId) {
    const url = action.link.replace("#", courseId);
    const config = {
      responseType: "arraybuffer",
    };
    if (action.method === "GET") {
      return axiosInstance.get(url, config);
    } else if (action.method === "POST") {
      return axiosInstance.post(url, {}, config);
    } else if (action.method === "PUT") {
      return axiosInstance.put(url, {}, config);
    } else if (action.method === "DELETE") {
      return axiosInstance.delete(url, config);
    }
  }
}

export default new CoursesServices();
