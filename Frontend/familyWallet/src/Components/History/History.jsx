import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import dashboard from "../../styles/dashboard.module.css";

function History() {
  const { transactionHistory } = useGlobalContext();
  const [...history] = transactionHistory();

  return (
    <div className={`${dashboard.historyDiv}`}>
      <h2>History</h2>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div key={_id} className={`${dashboard.historyItem}`}>
            <p
              style={{
                color: type === "income" ? "green" : "red",
              }}
            >
              {title}
            </p>

            <p
              style={{
                color: type === "income" ? "green" : "red",
              }}
            >
              {type === "income"
                ? `+${amount <= 0 ? 0 : amount}`
                : `-${amount <= 0 ? 0 : amount}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default History;
