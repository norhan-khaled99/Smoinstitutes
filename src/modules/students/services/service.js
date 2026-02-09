import {axiosInstance} from "app/http-common";

class StudentService {
  getAllStudents(page = 1){
    return axiosInstance.get(`/api/v1/profiles/students?page=${page}`);
  }
  searchStudent(search , status , last_name , mobile , course , page = 1){
    return axiosInstance.get(`/api/v1/profiles/students/search/?q=${search}&status=${status}&last_name=${last_name}&mobile=${mobile}&active_or_waiting_courses=${course}&page=${page}`)
}
}

export default new StudentService();
