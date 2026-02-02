import { axiosInstance } from "../../../../http-common.js";

class authServices {
  logIn(data) {
    return axiosInstance.post(
      "/api/v1/auth/token/",
      data
    );
  }

  getUserData() {
    return axiosInstance.get(
      "/api/v1/finance/user/balance/"
    );
  }



}

export default new authServices();
