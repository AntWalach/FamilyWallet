import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/colors.css";
import { GlobalProvider } from "./context/globalContext.jsx";
import { UserProvider } from "./context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </GlobalProvider>
  </React.StrictMode>
);
