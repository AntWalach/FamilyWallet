import layouts from "./styles/layouts.module.css";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dasboard";
import Expenses from "./Components/Expenses/Expenses";
import Incomes from "./Components/Incomes/Incomes";
import Transactions from "./Components/Transactions/Transactions";
import React, { useState } from "react";

function App() {
  const [active, setActive] = useState(1)
  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Transactions />
      case 3:
        return <Incomes />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className='App'>
      <div className={`${layouts.mainLayout}`}>
        <Navigation active={active} setActive={setActive}/>
        <main>
          {displayData()}
        </main>
      </div>
    </div>
  )
}

export default App
