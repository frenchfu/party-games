import logo from './logo.svg';
import './App.css';

//context
import { AppContext } from "./context/context";
import { useValue } from "./context/hooks";


//router
import { BrowserRouter,Routes, Route, Switch, Link, useHistory } from 'react-router-dom';

// Bootstrap CSS and js
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min";

//react Boot Strap 
import { Button } from 'react-bootstrap';


function App() {


  const { value, setValue } = useValue();

  return (
    <div className="App">
      <header className="App-header">
      <AppContext.Provider value={{ value }}>
        <BrowserRouter>
          <Routes>

          </Routes>
        </BrowserRouter>          
            <div>{value}</div>
            <button className='btn btn-primary' onClick={() => setValue(value + 1)}>add</button>
            <Button as="a" variant="primary"  onClick={() => setValue(value + 2)}>
              Button as link
            </Button>
            <Button as="a" variant="success">
              Button as link
            </Button>

        </AppContext.Provider>
      </header>
    </div>
  );
}

export default App;
