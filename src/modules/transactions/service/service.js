import {axiosInstance} from "app/http-common";

class TransactionService {
  getAllTransactions(){
    return axiosInstance.get(``);
  }
  
  getAllAccounts(value){
  return axiosInstance.get(`/api/v1/profiles/accounts/search-dropdown?q=${value}`);
  }







}

export default new TransactionService();
