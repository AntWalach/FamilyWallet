import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/api/v1/";

const FamilyContext = createContext();

export const FamilyProvider = ({ children }) => {
  const [familyData, setFamilyData] = useState({});

  const createFamily = async (familyName) => {
    try {
      const res = await axios.post(`${BASE_URL}create-family`, {
        name: familyName,
      });
      toast.success(`Family created successfully`);
      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
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
        familyRole: member.familyRole,
      });
      toast.success(`Member ${member.name} registered successfully!`);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(
        `There was an error registering member ${member.name}!`,
        error
      );
    }
  };

  const getFamily = async () => {
    try {
      const res = await axios.get(`${BASE_URL}family`);
      setFamilyData(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error fetching family details:", error);
    }
  };


  const deleteFamily = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}delete-family/${id}`)
      toast.success("Family deleted!")
      getFamily()
    } catch (error) {
      console.log("Error deleting family", error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <FamilyContext.Provider
      value={{ createFamily, registerFamilyMember, getFamily, familyData, deleteFamily }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => {
  return useContext(FamilyContext);
};
