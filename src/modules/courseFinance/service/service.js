import { axiosInstance } from "app/http-common";

class CourseFinanceService {

  getAllCourseFinance(page, type, value, searchQuery) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/profiles/accounts/search/?${type}=${value}&page=${page}`,
      );
    }
    else if (searchQuery) {
      return axiosInstance.get(
        `/api/v1/courses/finance/?q=${searchQuery}&page=${page}`
      );
    }
    else {
      return axiosInstance.get(`/api/v1/courses/finance/?page=${page}`);
    }
  }

  getAllShifts() {
    return axiosInstance.get(`/api/v1/auth/lookups/?key=course.shifts`);
  }

  executeAction(id) {
    const config = { responseType: 'arraybuffer' };
    return axiosInstance.get(`/api/v1/reports/courses/${id}/finance/`, config);
  }

  // getAllTransTypeOptions() {
  //   return axiosInstance.get(`/api/v1/auth/lookups/jtypes/dropdown/`);
  // }





}

export default new CourseFinanceService();
