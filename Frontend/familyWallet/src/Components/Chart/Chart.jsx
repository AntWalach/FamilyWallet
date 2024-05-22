import React, { useState, useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import dashboard from "../../styles/dashboard.module.css";
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
import { dateFormat } from "../../utils/dateFormat";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/globalContext";

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

function Chart() {
  const { incomes, expenses } = useGlobalContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Łączenie i sortowanie danych według daty
  const allData = [
    ...incomes.map((item) => ({ ...item, type: "income" })),
    ...expenses.map((item) => ({ ...item, type: "expense" })),
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filtruj dane według wybranego miesiąca i roku
  const filteredData = allData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getMonth() === selectedMonth &&
      itemDate.getFullYear() === selectedYear
    );
  });

  // Obliczanie skumulowanego salda
  const dailyBalances = {};
  filteredData.forEach((item) => {
    const dateStr = item.date;
    if (!dailyBalances[dateStr]) {
      dailyBalances[dateStr] = 0;
    }
    if (item.type === "income") {
      dailyBalances[dateStr] += item.amount;
    } else {
      dailyBalances[dateStr] -= item.amount;
    }
  });

  let cumulativeBalance = 0;
  const balanceData = Object.keys(dailyBalances)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => {
      cumulativeBalance += dailyBalances[date];
      return {
        date,
        balance: cumulativeBalance,
      };
    });

  // Przygotowanie danych do wykresu
  const data = {
    labels: balanceData.map((item) => dateFormat(item.date)),
    datasets: [
      {
        label: "Balance",
        data: balanceData.map((item) => item.balance),
        backgroundColor: "#ff7c4c",
        borderColor: "#ff7c4c",
        fill: false,
      },
    ],
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className={`${layouts.innerLayout}`}>
      <div className={`${dashboard.chartStyled}`}>
        <Line data={data} />
        <div>
          <label htmlFor="month">Month: </label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <label htmlFor="year">Year: </label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            {Array.from(
              new Set(allData.map((item) => new Date(item.date).getFullYear()))
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Chart;
