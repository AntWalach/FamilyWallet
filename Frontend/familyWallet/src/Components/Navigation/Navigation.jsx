import React, { useState, useEffect } from "react";
import layouts from "../../styles/layouts.module.css";
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/icons";
import avatar from "../../images/avatar.png";
import { useGlobalContext } from "../../context/globalContext";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import useRedirect from "../../hooks/useUserRedirect";

function Navigation({ active, setActive }) {
  useRedirect("/login");
  const navigate = useNavigate();
  const { logoutUser, user } = useUserContext();
  const { name, photo, isVerified, bio, role } = user;
  const { getExpenses, getIncomes, totalMoney } = useGlobalContext();

  useEffect(() => {
    getExpenses();
    getIncomes();
  }, []);
  const money = totalMoney();
  const moneyColor = money >= 0 ? "var(--primary-green)" : "var(--delete-red)";
  return (
    <div className={`${layouts.navigationStyled}`}>
      <div className={`${layouts.userContainer}`}>
        <img src={avatar} alt="avatar" />
        <div className={`${layouts.userText}`}>
          <h2>{name}</h2>
          <p>
            Your wallet:{" "}
            <span style={{ color: moneyColor }}>${Math.abs(money)}</span>
          </p>
        </div>
      </div>
      <ul className={`${layouts.menuItems}`}>
        {menuItems.map((item) => {
          const isAdmin = role === "admin";
          if (item.id === 6 && !isAdmin) return null;
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? layouts.active : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className={`${layouts.bottomNav}`}>
        <li onClick={(e) => logoutUser(navigate)}>{signout} Sign Out</li>
      </div>
    </div>
  );
}

export default Navigation;
