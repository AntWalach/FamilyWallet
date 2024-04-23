import React, { useEffect } from 'react'
import layouts from "../../styles/layouts.module.css";
import { useGlobalContext } from '../../context/globalContext';
import FormIncomes from '../Form/FormIncomes';
import MoneyItem from '../MoneyItem/MoneyItem';

function Incomes(){
    const {addIncome, incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()
    useEffect(()=> {
        getIncomes()
    }, [])
    return(
        <div className={`${layouts.incomes}`}>
            <div className={`${layouts.innerLayout}`}>
                <div className="row align-items-center">
                    <div className="col">
                        <h1>Incomes</h1>
                    </div>
                    <div className="col text-end">
                        <h3 className={`${layouts.totalIncome}`}>Total income: <span className={`${layouts.totalIncomeAmount}`}>${totalIncome()}</span></h3>
                    </div>
                </div>
                <div className={`${layouts.incomeContent}`}>
                    <div className={`${layouts.formContainer}`}>
                        <FormIncomes />
                    </div>
                    <div className={`${layouts.incomesDisplay}`}>
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description} = income;
                            return <MoneyItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                category={category}
                                deleteItem={deleteIncome}
                                type="incomes"
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Incomes