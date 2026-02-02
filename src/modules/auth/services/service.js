import { axiosInstance } from "../../../../http-common.js";

class authServices {
  logIn(data) {
    return axiosInstance.post(
      "/api/v1/auth/token/",
      data
    );
  }



}

export default new authServices();
