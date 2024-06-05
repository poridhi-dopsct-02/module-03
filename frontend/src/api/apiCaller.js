import axios from "axios";

const baseURL = "http://localhost:8000/api/expense";

export const fetchExpenses = () => {
  return axios.get(baseURL).then((response) => {
    const {
      totalIncome = 0,
      totalExpense = 0,
      transactions = [],
    } = response.data;
    return {
      totalIncome,
      totalExpense,
      transactions,
    };
  });
};

export const addExpenseRecord = (data) => {
  return axios.post(baseURL, data);
};

export const deleteExpenseRecord = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};
