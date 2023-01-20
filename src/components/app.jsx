import '../styles/App.css';
import { Route, Routes } from 'react-router-dom';

import MainNav from './mainNav';
import Appbar from './appbar';
import Body from './body';
import AllItems from './allItmes';
import UnderDevelopment from './underDevelopment';
import Login from "./login";
import Register from './register';
import { useState } from 'react';


function App() {

  const [user, setUser] = useState(undefined)

  function logUser(user) {
    console.log("logUser: " + user);
    setUser(user)
  }
  
  return (
    <Routes>
        <Route exact path='/login' element={
          <Login logUser={logUser}/>}
        />
        <Route path='/register' element={
          <Register logUser={logUser}/>}
        />
        <Route path='/*' element={
          <div style={{height: "100vh"}}>
            <Appbar/>
            <div style={{display: "flex"}}>
              {/* <MainNav/> */}
              <div>
                <Routes>
                  <Route exact path='/:email/:password' element={<Body user={user}/>}/>
                  <Route exact path='/' element={<Body user={user}/>}/>
                  <Route exact path='/all-passwords' element={<AllItems />}/>
                  <Route exact path='/*' element={<UnderDevelopment />}/>
                </Routes>
              </div>
            </div>
          </div>}/>
    </Routes>
  );
}

export default App;
