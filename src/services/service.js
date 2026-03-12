import {axiosInstance} from "app/http-common";

class GeneralService {
  getGeneralSearchData(search){
    return axiosInstance.get(`api/v1/search/global/?q=${search}`);
  }
}
export default new GeneralService();
