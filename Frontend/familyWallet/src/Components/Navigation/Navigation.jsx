import React, { useState, useEffect } from 'react'
import layouts from "../../styles/layouts.module.css";
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/icons';
import avatar from '../../images/avatar.png';
import { useGlobalContext } from '../../context/globalContext';


function Navigation({active, setActive}){
    const {getExpenses, getIncomes, totalMoney} = useGlobalContext()
    useEffect(()=> {
        getExpenses()
        getIncomes()
    }, [])
    const money = totalMoney();
    const moneyColor = money >= 0 ? 'var(--primary-green)' : 'var(--delete-red)';
    return(
        <div className={`${layouts.navigationStyled}`}>
            <div className={`${layouts.userContainer}`}>
                <img src={avatar} alt='avatar'/>
                <div className={`${layouts.userText}`}>
                    <h2>Adam</h2>
                    <p>Your wallet: <span style={{ color: moneyColor }}>${Math.abs(money)}</span></p>
                </div>
            </div>
            <ul className={`${layouts.menuItems}`}>
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? layouts.active : ''}           
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className={`${layouts.bottomNav}`}>
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </div>
    )
}

export default Navigation