import React, { useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import dashboard from "../../styles/dashboard.module.css";
import { useUserContext } from "../../context/userContext";
import Chart from "../Chart/Chart";
import History from "../History/History";
import { dollar } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";

function Dashboard() {
  const { user, emailVerification } = useUserContext();
  const { name, photo, isVerified, bio } = user;
  const {
    totalExpense,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <div className={`${layouts.dashboard}`}>
      <div className={`${layouts.innerLayout}`}>
        {isVerified ? (
          ""
        ) : (
          <button
            onClick={emailVerification}
            className={`${layouts.verifyBtn}`}
          >
            Verify account
          </button>
        )}
        <div className={`${dashboard.statsCon}`}>
          <div className={`${dashboard.chartCon}`}>
            <Chart />
            <div className={`${dashboard.amountCon}`}>
              <div className={`${dashboard.income}`}>
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className={`${dashboard.expense}`}>
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpense()}
                </p>
              </div>
              <div
                className={
                  totalBalance() < 0
                    ? `${dashboard.balanceNegative} ${dashboard.balance}`
                    : `${dashboard.balancePositive}  ${dashboard.balance}`
                }
              >
                <h2>Total Balance</h2>
                <p className="">
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className={`${dashboard.historyCon}`}>
            <History />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
