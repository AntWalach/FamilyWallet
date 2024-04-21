import React, {useState} from 'react'
import layouts from "../../styles/layouts.module.css"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useGlobalContext } from '../../context/globalContext'

function Form(){
    const {addIncome} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const {title, amount, date, category, description} = inputState;
    
    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
    }
    return(
        <form className={`${layouts.form}`} onSubmit={handleSubmit}>
            <div className={`${layouts.inputControl}`}>
                <input 
                    type="text" 
                    value={title}
                    name={'title'}
                    placeholder='Income title'
                    onChange={handleInput('title')}
                />
            </div>
            <div className={`${layouts.inputControl}`}>
                <input 
                    type="text" 
                    value={amount}
                    name={'amount'}
                    placeholder='Income amount'
                    onChange={handleInput('amount')}
                />
            </div>
            <div className={`${layouts.inputControl}`}>
                <DatePicker
                    id='date'
                    placeholderText='Enter a date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className={`${layouts.selects} ${layouts.inputControl}`}>
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className={`${layouts.inputControl}`}>
                <textarea name="description" value={description} placeholder='Add a description' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className={`${layouts.submitBtn}`}>
                <button className="">Add Income</button>
            </div>
        </form>
    )
}

export default Form