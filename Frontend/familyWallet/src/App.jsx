import layouts from "./styles/layouts.module.css";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dasboard";
import Expenses from "./Components/Expenses/Expenses";
import Incomes from "./Components/Incomes/Incomes";
import Transactions from "./Components/Transactions/Transactions";
import Family from "./Components/Family/Family";
import React, { useState } from "react";
import { useGlobalContext } from "./context/globalContext";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import VerifyUser from "./pages/verify-user/[verificationToken]/VerifyUser";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/[resetToken]/ResetPassword";
import Settings from "./Components/Settings/Settings";
import { useUserContext } from "./context/userContext";
import Admin from "./Components/Admin/Admin";

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  const user = useUserContext();
  const { role, isVerified } = user;
  console.log(role);
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard active={active} setActive={setActive} />;
      case 2:
        return <Family />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      case 5:
        return <Transactions />;
      case 6:
        return <Settings />;
      case 7:
        return <Admin />;
      default:
        return <Dashboard active={active} setActive={setActive} />;
    }
  };

  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route
            path="/verify-email/:verificationToken"
            element={<VerifyUser />}
          ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/familywallet"
            element={
              <div className={`${layouts.mainLayout}`}>
                <Navigation active={active} setActive={setActive} />
                <main>{displayData()}</main>
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
