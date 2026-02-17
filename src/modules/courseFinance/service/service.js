import { axiosInstance } from "app/http-common";

class CourseFinanceService {

  getAllCourseFinance(page, from, to,status,shift,search) {
    let query = `page=${page}`;

    if (from) query += `&courseserial_from=${encodeURIComponent(from)}`;
    if (to) query += `&courseserial_to=${encodeURIComponent(to)}`;
    if (status) query += `&status=${encodeURIComponent(status)}`;
    if (shift) query += `&shift=${encodeURIComponent(shift)}`;
    if (search) query += `&q=${encodeURIComponent(search)}`;

    return axiosInstance.get(`/api/v1/courses/finance/?${query}`);
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
