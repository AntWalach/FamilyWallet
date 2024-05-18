import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const UserContext = React.createContext();
axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:5000/api/v1/";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const registerUser = async (navigate, e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}register`, userState);
      console.log(res.data);
      toast.success("User registered successfully");

      setUserState({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  const loginUser = async (navigate, e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}login`,
        {
          email: userState.email,
          password: userState.password,
        },
        { withCredentials: true }
      );
      await getUser();

      toast.success("User logged in successfully");
      setUserState({
        email: "",
        password: "",
      });

      navigate("/familywallet");
    } catch (error) {
      console.log("Error login user", error);
      toast.error(error.response.data.message);
    }
  };

  const userLoginStatus = async (navigate) => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${BASE_URL}login-status`, {
        withCredentials: true,
      });

      loggedIn = !!res.data;
      setLoading(false);

      if (!loggedIn) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  };

  const logoutUser = async (navigate) => {
    try {
      const res = await axios.get(`${BASE_URL}logout`, {
        withCredentials: true,
      });
      toast.success("User logged out successfully");

      navigate("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}user`, {
        withCredentials: true,
      });
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });
      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}verify-email`,
        {},
        { withCredentials: true }
      );
      toast.success("Email verification sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error sending email verification", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const verifyUser = async (navigate, token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}verify-user/${token}`,
        {},
        { withCredentials: true }
      );

      toast.success("User verified successfully");
      await getUser();

      setLoading(false);
      navigate("/familywallet");
    } catch (error) {
      console.log("Error varifying user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const forgotPasswordEmail = async (navigate, email) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}forgot-password`,
        { email },
        { withCredentials: true }
      );

      toast.success("Forgot password email sent successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log("Error sending forgot password email", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const resetPassword = async (navigate, token, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}reset-password/${token}`,
        { password },
        { withCredentials: true }
      );

      toast.success("Password reset successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}change-password`,
        { currentPassword, newPassword },
        {
          withCredentials: true,
        }
      );
      toast.success("Password changed successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}admin/users`,
        {},
        { withCredentials: true }
      );

      setAllUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting all users", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${BASE_URL}admin/users/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("User deleted successfully");
      setLoading(false);
      getAllUsers();
    } catch (error) {
      console.log("Error deleting user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;
    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();
      console.log("isLoggedIn", isLoggedIn);
      if (isLoggedIn) {
        getUser();
      }
    };
    loginStatusGetUser();
  }, []);

  useEffect(() => {
    if (user.role === "admin") {
      getAllUsers();
    }
  }, [user.role]);
  console.log(user);
  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        logoutUser,
        userLoginStatus,
        getUser,
        user,
        emailVerification,
        verifyUser,
        forgotPasswordEmail,
        resetPassword,
        changePassword,
        allUsers,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
