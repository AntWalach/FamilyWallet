import React, { useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import dashboard from "../../styles/dashboard.module.css";
import FamilyRegistrationForm from "../Form/FamilyRegistrationForm";
import { useFamilyContext } from "../../context/familyContext";
import { useUserContext } from "../../context/userContext";
import DoughnutChart from "../Chart/DoughnutChart";
import { dollar, plus } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";
function Family() {
  const { user, getUser } = useUserContext();
  const { family } = user;
  const { getFamily, familyData, deleteFamily } = useFamilyContext();
  const { totalExpense, totalIncome, totalBalance, getIncomes, getExpenses } =
    useGlobalContext();
  useEffect(() => {
    if (family) {
      getFamily();
    }
  }, [family]);

  const handleDeleteFamily = async () => {
    await deleteFamily(family);
    await getUser();
  };

  console.log(familyData.members);

  return (
    <div className={`${layouts.dashboard}`}>
      <div className={layouts.innerLayout}>
        {!family ? (
          <div className={`${layouts.familyRegistrationContent}`}>
            <FamilyRegistrationForm />
          </div>
        ) : (
          familyData &&
          familyData.members && (
            <div className={`${dashboard.statsCon}`}>
              <div className={`${dashboard.chartCon}`}>
                <h1>Family {familyData.name}</h1>
                <button
                  className={`${layouts.buttonRemoveFamily}`}
                  onClick={handleDeleteFamily}
                >
                  Delete Family
                </button>
                <DoughnutChart members={familyData.members} />{" "}
                <div className={`${dashboard.amountCon}`}></div>
              </div>

              <div className={`${dashboard.historyCon}`}>
                <div className={`${dashboard.historyDiv}`}>
                  {familyData.members.map((member) => (
                    <div
                      key={member._id}
                      className={`${dashboard.historyItem}`}
                    >
                      <p>Name: {member.name}</p>
                      <p>Email: {member.email}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div></div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Family;
