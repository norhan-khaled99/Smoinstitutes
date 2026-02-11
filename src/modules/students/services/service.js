import {axiosInstance} from "app/http-common";

class StudentService {
  getAllStudents(page = 1) {
    return axiosInstance.get(`/api/v1/profiles/students?page=${page}`);
  }

  searchStudent(search, status = "", page = 1, balance = "", last_name = "", mobile = "", course = "") {
    return axiosInstance.get(`/api/v1/profiles/students/search/?q=${search}&status=${status}&balance=${balance}&last_name=${last_name}&mobile=${mobile}&active_or_waiting_courses=${course}&page=${page}`)
  }
  getAllCities() {
    return axiosInstance.get(`/api/v1/auth/lookups/?key=person.city_choices`);
  }
  addStudent(data) {
    return axiosInstance.post(`/api/v1/profiles/students/`, data);
  }
  updateStudent(id, data) {
    return axiosInstance.patch(`/api/v1/profiles/students/${id}/`, data);
  }
  getStudentById(id) {
    return axiosInstance.get(`/api/v1/profiles/students/${id}/profile`);
  }
  getCoursesForRegistration(id) {
    return axiosInstance.get(`/api/v1/courses/profile/lookup/?q=Acce`);
  }
  registerCourse(id , data) {
    return axiosInstance.post(`/api/v1/courses/profile/${id}/register/`, data);
  }
  addCourseDiscount(id , data) {
    return axiosInstance.post(`/api/v1/courses/profile/${id}/add-discount/`, data);
  }
  cancelCourseRegistration(id , data) {
    return axiosInstance.post(`/api/v1/courses/profile/${id}/cancel-registration/`, data);
  }
}

export default new StudentService();
