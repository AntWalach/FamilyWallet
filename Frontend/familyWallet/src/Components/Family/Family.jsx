import React, { useState, useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import FamilyRegistrationForm from "./FamilyRegistrationForm";
import { useFamilyContext } from "../../context/familyContext";
import { useUserContext } from "../../context/userContext";

function Family() {
  const { user } = useUserContext();
  const { name, family } = user;
  const { getFamily, family: familyData } = useFamilyContext();


  useEffect(() => {
    const fetchFamilyDetails = async () => {
      if (family) {
        try {
          await getFamily(family);
        } catch (error) {
          console.error("Error fetching family details:", error);
        } 
      } else {
        console.log("Error familyId")
      }
    };

    fetchFamilyDetails();
  }, [family, getFamily]);

  return (
    <div className={layouts.familyPage}>
      <h1>Family Page {name}</h1>
      {!family ? (
        <FamilyRegistrationForm />
      ) : (
        familyData && familyData.members && (
          <div>
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
