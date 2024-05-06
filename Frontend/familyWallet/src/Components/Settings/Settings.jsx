import React from "react";
import layouts from "../../styles/layouts.module.css";
import FormChangePassword from "../Auth/FormChangePassword";

function Settings() {
  return (
    <div className={`${layouts.innerLayout}`}>
      <h1>Settings</h1>
      <FormChangePassword/>
    </div>
  );
}

export default Settings;
