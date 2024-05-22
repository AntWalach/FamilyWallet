import React, { useEffect, useState } from "react";
import layouts from "../../styles/layouts.module.css";
import { useGlobalContext } from "../../context/globalContext";
import FormExpenses from "../Form/FormExpenses";
import MoneyItem from "../MoneyItem/MoneyItem";

function Expenses() {
  const { addExpense, expenses, getExpenses, deleteExpense, totalExpense } =
    useGlobalContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getExpenses();
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === selectedMonth &&
      expenseDate.getFullYear() === selectedYear &&
      (expense.title.toLowerCase().includes(searchText.toLowerCase()) ||
        expense.description.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  return (
    <div className={`${layouts.incomes}`}>
      <div className={`${layouts.innerLayout}`}>
        <div className="row align-items-center">
          <div className="col">
            <h1>Expenses</h1>
          </div>
          <div className="col text-end">
            <h3 className={`${layouts.totalExpense}`}>
              Total expense:{" "}
              <span className={`${layouts.totalExpenseAmount}`}>
                ${totalExpense()}
              </span>
            </h3>
          </div>
        </div>
        <div className={`${layouts.incomeContent}`}>
          <div className={`${layouts.formContainer}`}>
            <FormExpenses />
          </div>
          <div className={`${layouts.incomesDisplay}`}>
            <div>
              <label htmlFor="month">Month: </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <label htmlFor="year">Year: </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {Array.from(
                  new Set(
                    expenses.map((expense) =>
                      new Date(expense.date).getFullYear()
                    )
                  )
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            {filteredExpenses.map((expense) => {
              const { _id, title, amount, date, category, description } =
                expense;
              return (
                <MoneyItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  category={category}
                  deleteItem={deleteExpense}
                  type="expense"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
