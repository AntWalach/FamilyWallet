import React, { useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import dashboard from "../../styles/dashboard.module.css";
import FamilyRegistrationForm from "../Form/FamilyRegistrationForm";
import { useFamilyContext } from "../../context/familyContext";
import { useUserContext } from "../../context/userContext";
import DoughnutChart from "../Chart/DoughnutChart";

function Family() {
  const { user, getUser } = useUserContext();
  const { family } = user;
  const { getFamily, familyData, deleteFamily } = useFamilyContext();

  useEffect(() => {
    if (family) {
      getFamily();
    }
  }, [family]);

  const handleDeleteFamily = async () => {
    await deleteFamily(family);
    await getUser();
  };

  console.log(familyData.members)

  return (
    <div className={`${layouts.familyRegistration}`}>
      <div className={layouts.innerLayout}>
        {!family ? (
          <div className={`${layouts.familyRegistrationContent}`}>
            <FamilyRegistrationForm />
          </div>
        ) : (
          familyData &&
          familyData.members && (
            <div className={`${dashboard.statsCon}`}>
              <div>
                <h1>Family {familyData.name}</h1>
                <button
                  className={`${layouts.buttonRemoveFamily}`}
                  onClick={handleDeleteFamily}
                >
                  Delete Family
                </button>
                <DoughnutChart members={familyData.members} /> {/* Przekazywanie listy członków rodziny jako props */}
                <div>
                  {familyData.members.map((member) => (
                    <div key={member._id}>
                      <p>Name: {member.name}</p>
                      <p>Email: {member.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Family;