import React from 'react'
import layouts from "../../styles/layouts.module.css";
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';

function Incomes(){
    const {addIncome} = useGlobalContext()
    return(
        <div className={`${layouts.incomes}`}>
            <div className={`${layouts.innerLayout}`}>
                <h1>Incomes</h1>
                <div className={`${layouts.incomeContent}`}>
                    <div className={`${layouts.formContainer}`}>
                        <Form />
                    </div>
                    <div className={`${layouts.incomesDisplay}`}></div>
                </div>
            </div>
        </div>
    )
}



export default Incomes