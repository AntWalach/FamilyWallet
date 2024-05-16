import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/api/v1/";

const FamilyContext = React.createContext();

export const FamilyProvider = ({ children }) => {
  const createFamily = async (familyData) => {
    try {
      const response = await axios.post(`${BASE_URL}create-family`, familyData);
      console.log(response.data);
    } catch (error) {
      console.log("Error creating family", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const joinFamily = async (familyName) => {
    try {
      const response = await axios.post(`${BASE_URL}join-family/${familyName}`);
      console.log(response.data);
    } catch (error) {
      console.log("Error joining family", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <FamilyContext.Provider value={{ createFamily, joinFamily }}>
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => {
  return useContext(FamilyContext);
};
