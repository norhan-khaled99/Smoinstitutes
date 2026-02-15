import { axiosInstance } from "app/http-common";

class TransactionService {


  getAllTransactions(page, type, value, searchQuery) {
    if (type && value) {
      return axiosInstance.get(
        `/api/v1/profiles/accounts/search/?${type}=${value}&page=${page}`,
      );
    }
    else if (searchQuery) {
      return axiosInstance.get(
        `/api/v1/profiles/accounts/search/?q=${searchQuery}&page=${page}`
      );
    }
    else {
      return axiosInstance.get(`/api/v1/finance/transactions/?page=${page}`);
    }
  }

  getAllAccounts(value) {
    return axiosInstance.get(`/api/v1/profiles/accounts/search-dropdown?q=${value}`);
  }

  getAllTransTypeOptions() {
    return axiosInstance.get(`/api/v1/auth/lookups/jtypes/dropdown/`);
  }





}

export default new TransactionService();
