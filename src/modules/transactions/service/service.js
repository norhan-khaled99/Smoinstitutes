import { axiosInstance } from "app/http-common";
import { v4 as uuidv4 } from 'uuid'; 


class TransactionService {


  getAllTransactions(page, from, to, type) {
    let query = `page=${page}`;

    if (from) query += `&from=${encodeURIComponent(from)}`;
    if (to) query += `&to=${encodeURIComponent(to)}`;
    if (type) query += `&jtype=${encodeURIComponent(type)}`;

    return axiosInstance.get(`/api/v1/finance/transactions/?${query}`);
  }


  getAllAccounts(value) {
    return axiosInstance.get(`/api/v1/profiles/accounts/search-dropdown?q=${value}`);
  }

  getAllCategoryOptions() {
    return axiosInstance.get(`/api/v1/courses/profile/lookup/?q=Acce`);
  }

  getAllTransTypeOptions() {
    return axiosInstance.get(`/api/v1/auth/lookups/jtypes/dropdown/`);
  }

  getAllTransactionTypeOptions() {
    return axiosInstance.get(`/api/v1/auth/lookups/jtypes/dropdown/?q=tr`);
  }

  addTransaction(data) {
    const idempotencyKey = uuidv4(); // توليد key فريد
    return axiosInstance.post(`/api/v1/finance/generic/`, data, {
      headers: {
        'Idempotency-Key': idempotencyKey
      }
    });
  }


}

export default new TransactionService();
