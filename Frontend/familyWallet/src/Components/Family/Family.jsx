import React, { useState, useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import FamilyRegistrationForm from "./FamilyRegistrationForm";
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
    <div className={layouts.innerLayout}>
      <h1>Family Page {name}</h1>
      {!family ? (
        <FamilyRegistrationForm />
      ) : (
        familyData &&
        familyData.members && (
          <div>
            <button onClick={handleDeleteFamily}>Delete Family</button>
            <h2>Family Members</h2>
            <ul>
              {familyData.members.map((member) => (
                <li key={member._id}>
                  <div>Name: {member.name}</div>
                  <div>Email: {member.email}</div>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default Family;
