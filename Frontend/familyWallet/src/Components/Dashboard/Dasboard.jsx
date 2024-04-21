import React from 'react'
import layouts from "../../styles/layouts.module.css";

function Dashboard(){
    return(
        <div className={`${layouts.dashboard}`}>
            <div className={`${layouts.innerLayout}`}>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}



export default Dashboard