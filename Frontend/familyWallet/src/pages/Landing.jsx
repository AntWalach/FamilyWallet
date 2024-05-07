import React from 'react'
import buddyImage from '../assets/buddy.png'
import layouts from "../styles/layouts.module.css";
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <div className="row justify-content-end">
        <div className="col-1">
          <Link to="/login" className={`btn ${layouts.landingBtnLogin}`}>
            LOGIN
          </Link>
        </div>
        <div className="col-2">
          <Link to="/register" className={`btn ${layouts.landingBtnRegister}`}>
            REGISTER
          </Link>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h1 className={`${layouts.landingTitle}`}>Manage Home <span className={`${layouts.landingTitleOrange}`}>Expenses</span> Anywhere in <span className={`${layouts.landingTitlePink}`}>Real</span> Time</h1>
        </div>
        <div className='col'>
          <img src={buddyImage} alt="Buddy" className={`${layouts.landingBuddy}`}/>
        </div>
      </div>
    </div>
  )
}

export default Landing