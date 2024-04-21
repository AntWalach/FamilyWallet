import React, { useEffect } from 'react'
import layouts from "../../styles/layouts.module.css";
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Incomes(){
    const {addIncome, incomes, getIncomes, deleteIncome} = useGlobalContext()
    useEffect(()=> {
        getIncomes()
    }, [incomes])
    return(
        <div className={`${layouts.incomes}`}>
            <div className={`${layouts.innerLayout}`}>
                <h1>Incomes</h1>
                <div className={`${layouts.incomeContent}`}>
                    <div className={`${layouts.formContainer}`}>
                        <Form />
                    </div>
                    <div className={`${layouts.incomesDisplay}`}>
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                category={category}
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Incomes