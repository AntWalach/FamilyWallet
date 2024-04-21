import React from 'react'
import layouts from "../../styles/layouts.module.css";

function Transactions(){
    return(
        <div className={`${layouts.transactions}`}>
            <div className={`${layouts.innerLayout}`}>
                <h1>Transactions</h1>
            </div>
        </div>
    )
}



export default Transactions