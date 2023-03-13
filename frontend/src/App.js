import './App.css';
import React, { useContext } from 'react';
import TopBar from './components/Partial/TopBar';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Event from './components/Events/Event';
import EventsIndex from './components/Events/EventsIndex';
import LoginForm from './components/Auth/Login';
import MainHeader from './components/MainHeader/MainHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './context/auth-context';

function App() {
  const ctx = useContext(AuthContext)
  return (
    <React.Fragment>
      {console.log(`ctx.isLoggedIn : ${ctx.isLoggedIn}`)}
      <BrowserRouter>
        <div className="App">
          <MainHeader />
          {/* <main>
          {!ctx.isLoggedIn && <LoginForm />}
          {ctx.isLoggedIn && <Home />}
        </main> */}
          <div className="page-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventsIndex />} />
              <Route path="/event/:eventId" element={<Event />} />
              <Route path="/login" element={ctx.isLoggedIn ? <Home /> : <LoginForm />} />
              {/* <Route path="/signup" element={<SignUpPage />} /> */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App