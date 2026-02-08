import {axiosInstance} from "app/http-common";

class StudentService {
  getAllStudents(){
    return axiosInstance.get("/api/v1/profiles/students");
  }
}

export default new StudentService();
