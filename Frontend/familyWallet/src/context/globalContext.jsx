import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //Incomes
  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, income);
      toast.success("Income added successfully");
      getIncomes();
    } catch (error) {
      console.log("Error adding income", error);
      toast.error(error.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (error) {
      console.log("Error getting incomes", error);
      toast.error(error.response.data.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}delete-income/${id}`);
      toast.success("Income deleted successfully");
      getIncomes();
    } catch (error) {
      console.log("Error deleting income", error);
      toast.error(error.response.data.message);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });

    return totalIncome;
  };

  //Expenses
  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expense);
      toast.success("Expense added successfully");
      getExpenses();
    } catch (error) {
      console.log("Error adding expense", error);
      toast.error(error.response.data.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.log("Error getting expenses", error);
      toast.error(error.response.data.message);
    }
  };

  const getExpensesId = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses/${userId}`);
      return response.data;
    } catch (error) {
      console.log("Error getting expenses", error);
      toast.error(error.response.data.message);
    }
  };

  const getExpensesForAllMembers = async (members) => {
    const allExpenses = await Promise.all(
      members.map(async (member) => {
        const memberExpenses = await getExpensesId(member._id);
        return memberExpenses;
      })
    );

    return allExpenses.flat().reduce((totalExpenses, memberExpenses) => {
      return totalExpenses.concat(memberExpenses);
    }, []);
  };

  const deleteExpense = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}delete-expense/${id}`);
      toast.success("Expense deleted successfully");
      getExpenses();
    } catch (error) {
      console.log("Error deleting expense", error);
      toast.error(error.response.data.message);
    }
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });

    return totalExpense;
  };

  //Other
  const totalMoney = () => {
    let totalMoney = 0;
    incomes.forEach((income) => {
      totalMoney += income.amount;
    });
    expenses.forEach((expense) => {
      totalMoney -= expense.amount;
    });

    return totalMoney;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpense,
        totalMoney,
        totalBalance,
        transactionHistory,
        getExpensesId,
        getExpensesForAllMembers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
