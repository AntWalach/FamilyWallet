import React, { useEffect } from 'react'
import layouts from "../../styles/layouts.module.css";
import { useGlobalContext } from '../../context/globalContext';
import FormExpenses from '../Form/FormExpenses';
import MoneyItem from '../MoneyItem/MoneyItem';

function Expenses(){
    const {addExpense, expenses, getExpenses, deleteExpense, totalExpense} = useGlobalContext()
    useEffect(()=> {
        getExpenses()
    }, [])
    return(
        <div className={`${layouts.incomes}`}>
            <div className={`${layouts.innerLayout}`}>
                <div className="row align-items-center">
                    <div className="col">
                        <h1>Expenses</h1>
                    </div>
                    <div className="col text-end">
                        <h3 className={`${layouts.totalExpense}`}>Total expense: <span className={`${layouts.totalExpenseAmount}`}>${totalExpense()}</span></h3>
                    </div>
                </div>
                <div className={`${layouts.incomeContent}`}>
                    <div className={`${layouts.formContainer}`}>
                        <FormExpenses />
                    </div>
                    <div className={`${layouts.incomesDisplay}`}>
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description} = expense;
                            return <MoneyItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                category={category}
                                deleteItem={deleteExpense}
                                type="expense"
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Expenses