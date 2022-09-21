import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Auth from './pages/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from './Contexts/UserContext';

function App() {

  const [userObj, setUserObj] = useState();

  return (
    <div className="App">


      <UserContext.Provider value={ {userObj, setUserObj} }>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<SignUp/>} />
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/auth" element={<Auth/>} />

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>

      
    </div>
  );
}

export default App;
