import React, { useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import dashboard from "../../styles/dashboard.module.css";
import { useUserContext } from "../../context/userContext";
import Chart from "../Chart/Chart";
import History from "../History/History";
import { dollar, plus } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";
import { useFamilyContext } from "../../context/familyContext";

function Dashboard({ active, setActive }) {
  const { user, emailVerification } = useUserContext();
  const { name, photo, isVerified, bio, family } = user;
  const { totalExpense, totalIncome, totalBalance, getIncomes, getExpenses } =
    useGlobalContext();
  const { getFamily, familyData } = useFamilyContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
    if (family) {
      getFamily();
    }
  }, [family]);

  const handleAddFamilyClick = () => {
    setActive(2);
  };

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
                    : `${dashboard.balancePositive} ${dashboard.balance}`
                }
              >
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className={`${dashboard.historyCon}`}>
            <History />
          </div>

          {!family ? (
            <div
              className={`${dashboard.addFamily}`}
              onClick={handleAddFamilyClick}
            >
              <h2>Add Family {plus} </h2>
            </div>
          ) : (
            familyData &&
            familyData.members && (
              <div className={`${dashboard.family}`}>
                <div>
                  {familyData.members.map((member) => (
                    <div key={member._id}>
                      <p>Name: {member.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
