import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/colors.css";
import { GlobalProvider } from "./context/globalContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { FamilyProvider } from "./context/familyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <GlobalProvider>
        <FamilyProvider>
          <App />
        </FamilyProvider>
      </GlobalProvider>
    </UserProvider>
  </React.StrictMode>
);
