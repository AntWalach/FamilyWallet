import React from 'react'
import layouts from "../../styles/layouts.module.css";

function Expenses(){
    return(
        <div className={`${layouts.expenses}`}>
            <div className={`${layouts.innerLayout}`}>
                <h1>Expenses</h1>
            </div>
        </div>
    )
}



export default Expenses