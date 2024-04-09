import layouts from "./styles/layouts.module.css";
import Navigation from "./Components/Navigation/Navigation";

function App() {
  return (
    <div className='App'>
      <div className={`${layouts.mainLayout}`}>
        <Navigation/>
      </div>
    </div>
  )
}

export default App
