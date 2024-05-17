import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/api/v1/";

const FamilyContext = createContext();

export const FamilyProvider = ({ children }) => {
  const [family, setFamily] = useState(null);

  const createFamily = async (familyName) => {
    try {
      const res = await axios.post(`${BASE_URL}create-family`, {
        name: familyName,
      });
      return res.data.data;
    } catch (error) {
      toast.error("There was an error creating the family!");
      console.error("There was an error creating the family!", error);
    }
  };

  const registerFamilyMember = async (familyId, member) => {
    try {
      await axios.post(`${BASE_URL}register-family-member`, {
        familyId,
        name: member.name,
        email: member.email,
        password: member.password,
      });
      toast.success(`Member ${member.name} registered successfully!`);
    } catch (error) {
      toast.error(`There was an error registering member ${member.name}!`);
      console.error(
        `There was an error registering member ${member.name}!`,
        error
      );
    }
  };

  const getFamily = async (familyId) => {
    try {
      const res = await axios.get(`${BASE_URL}family/${familyId}`);
      setFamily(res.data); 
      return res.data;
    } catch (error) {
      console.error("Error fetching family details:", error);
    }
  };

  return (
    <FamilyContext.Provider
      value={{ createFamily, registerFamilyMember, getFamily, family }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => {
  return useContext(FamilyContext);
};
