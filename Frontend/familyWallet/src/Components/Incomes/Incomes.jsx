import React, { useEffect, useState } from "react";
import layouts from "../../styles/layouts.module.css";
import { useGlobalContext } from "../../context/globalContext";
import FormIncomes from "../Form/FormIncomes";
import MoneyItem from "../MoneyItem/MoneyItem";

function Incomes() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } =
    useGlobalContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getIncomes();
  }, []);

  const filteredIncomes = incomes.filter((income) => {
    const incomeDate = new Date(income.date);
    return (
      incomeDate.getMonth() === selectedMonth &&
      incomeDate.getFullYear() === selectedYear &&
      (income.title.toLowerCase().includes(searchText.toLowerCase()) ||
        income.description.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  return (
    <div className={`${layouts.incomes}`}>
      <div className={`${layouts.innerLayout}`}>
        <div className="row align-items-center">
          <div className="col">
            <h1>Incomes</h1>
          </div>
          <div className="col text-end">
            <h3 className={`${layouts.totalIncome}`}>
              Total income:{" "}
              <span className={`${layouts.totalIncomeAmount}`}>
                ${totalIncome()}
              </span>
            </h3>
          </div>
        </div>
        <div className={`${layouts.incomeContent}`}>
          <div className={`${layouts.formContainer}`}>
            <FormIncomes />
          </div>
          <div className={`${layouts.incomesDisplay}`}>
            <div className={`${layouts.selector}`}>
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
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {Array.from(
                  new Set(
                    incomes.map((income) => new Date(income.date).getFullYear())
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
            {filteredIncomes.map((income) => {
              const { _id, title, amount, date, category, description } =
                income;
              return (
                <MoneyItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  category={category}
                  deleteItem={deleteIncome}
                  type="incomes"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Incomes;
