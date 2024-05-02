import { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const useRedirect = (redirect) => {
  const { userLoginStatus } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        const isLoggedUser = await userLoginStatus();
        console.log("isLoggedUser", isLoggedUser);

        if (!isLoggedUser) navigate(redirect);
      } catch (error) {
        console.log("Error in redirecting User", error);
      }
    };
    redirectUser();
  }, [redirect, userLoginStatus, navigate]);
};

export default useRedirect;
