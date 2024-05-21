import React, { useState, useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import FamilyRegistrationForm from "../Form/FamilyRegistrationForm";
import { useFamilyContext } from "../../context/familyContext";
import { useUserContext } from "../../context/userContext";

function Family() {
  const { user, getUser } = useUserContext();
  const { name, family } = user;
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
            <div>
              <h1>Family {familyData.name}</h1>
              <ul>
                {familyData.members.map((member) => (
                  <li key={member._id}>
                    <div>Name: {member.name}</div>
                    <div>Email: {member.email}</div>
                  </li>
                ))}
              </ul>
              <button className={`${layouts.buttonRemoveFamily}`} onClick={handleDeleteFamily}>
                Delete Family
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Family;
