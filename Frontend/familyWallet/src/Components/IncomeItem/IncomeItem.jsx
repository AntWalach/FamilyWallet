import React from 'react'
import layouts from "../../styles/layouts.module.css";
import { dollar,calender,comment, money, freelance, stocks, users, card, piggy, book, food, medical, tv, takeaway, clothing, circle } from '../../utils/icons';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    type
}){

    const categoryIcon = () =>{
        switch(category){
            case 'salary':
                return money
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks
            case 'stocks':
                return users
            case 'bank':
                return card
            case 'other':
                return piggy
            default:
                return ''
        }
    }

    const expenseIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }


    return(
        <div className={`${layouts.incomeItem}`}>
            <div className={`${layouts.icon}`}>
                {type === 'expense' ? expenseIcon() : categoryIcon()}
            </div>
            <div className={`${layouts.content}`}>
                <h5>{title}</h5>
                <div className={`${layouts.innerContent}`}>
                    <div className={`${layouts.text} row`}>
                        <div className="col-auto my-auto">
                            <p>{dollar} {amount}</p>
                        </div>
                        <div className="col-auto">
                            <p>{calender} {date}</p>
                        </div>
                        <div className="col-auto">
                            <p>
                                {comment}
                                {description}
                            </p>
                        </div>
                        <div className="col text-end">
                            <button className={`${layouts.buttonSubmit}`} onClick={()=> deleteItem(id)}>
                                <i className="fa-regular fa-trash-can mx-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomeItem