import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useGlobalContext } from "../../context/globalContext";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useUserContext } from "../../context/userContext";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function DoughnutChart({ members }) {
  const { getExpensesId, getExpensesForAllMembers } = useGlobalContext();
  const { user } = useUserContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMember, setSelectedMember] = useState("all");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      let expensesData;
      if (selectedMember === "all") {
        expensesData = await getExpensesForAllMembers(members);
      } else {
        expensesData = await getExpensesId(selectedMember);
      }
      setExpenses(expensesData);
    };
    fetchExpenses();
  }, [selectedMember, getExpensesId, members]);

  console.log(expenses);

  const filteredExpenses = Array.isArray(expenses)
    ? expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === selectedMonth &&
          expenseDate.getFullYear() === selectedYear &&
          (selectedMember === "all" || expense.user === selectedMember)
        );
      })
    : [];

  const categoryTotals = filteredExpenses.reduce((totals, expense) => {
    const { category, amount } = expense;
    if (!totals[category]) {
      totals[category] = 0;
    }
    totals[category] += amount;
    return totals;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#32CD32",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#32CD32",
        ],
      },
    ],
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMemberChange = (e) => {
    setSelectedMember(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="month">Month: </label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("en-US", { month: "long" })}
            </option>
          ))}
        </select>
        <label htmlFor="year">Year: </label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          {Array.from(
            new Set(
              expenses.map((expense) => new Date(expense.date).getFullYear())
            )
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="member">Member: </label>
        <select
          id="member"
          value={selectedMember}
          onChange={handleMemberChange}
        >
          <option value="all">All</option>
          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <Doughnut data={data} />
    </div>
  );
}

export default DoughnutChart;
