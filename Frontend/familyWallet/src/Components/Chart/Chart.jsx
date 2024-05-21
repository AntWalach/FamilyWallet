import React from "react";
import layouts from "../../styles/layouts.module.css";
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

  // Łączenie i sortowanie danych według daty
  const allData = [
    ...incomes.map(item => ({ ...item, type: 'income' })),
    ...expenses.map(item => ({ ...item, type: 'expense' }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Obliczanie skumulowanego salda
  let cumulativeBalance = 0;
  const balanceData = allData.map(item => {
    if (item.type === 'income') {
      cumulativeBalance += item.amount;
    } else {
      cumulativeBalance -= item.amount;
    }
    return {
      date: item.date,
      balance: cumulativeBalance
    };
  });

  // Przygotowanie danych do wykresu
  const data = {
    labels: balanceData.map(item => dateFormat(item.date)),
    datasets: [
      {
        label: "Balance",
        data: balanceData.map(item => item.balance),
        backgroundColor: "#ff7c4c",
        borderColor: "#ff7c4c",
        fill: false,
      },
    ],
  };

  return (
    <div className={`${layouts.innerLayout}`}>
      <Line data={data} />
    </div>
  );
}

export default Chart;
