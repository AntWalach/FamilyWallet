import React, { useState } from 'react'
import layouts from "../../styles/layouts.module.css";
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/icons';
import avatar from '../../images/avatar.png'


function Navigation({active, setActive}){
    return(
        <div className={`${layouts.navigationStyled}`}>
            <div className={`${layouts.userContainer}`}>
                <img src={avatar} alt='avatar'/>
                <div className={`${layouts.userText}`}>
                    <h2>Adam</h2>
                    <p>Your Money</p>
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