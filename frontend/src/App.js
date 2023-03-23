import './App.css';
import React, { useContext } from 'react';
// import TopBar from './components/Partial/TopBar';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Event from './components/Events/Event';
import EventsIndex from './components/Events/EventsIndex';
import LoginForm from './components/Login/Login';
import SignupForm from './components/Login/Signup';
import MainHeader from './components/MainHeader/MainHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './context/auth-context';
import EventModal from './components/Events/EventModal';

function App() {
  const ctx = useContext(AuthContext)

  const hideEventModal = () => {
  
  }

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
              <Route path="/event/:eventId" element={<EventModal onClose={hideEventModal} />} />
              <Route path="/login" element={ctx.isLoggedIn ? <Home /> : <LoginForm />} />
              <Route path="/register" element={ctx.isLoggedIn ? <Home /> : <SignupForm />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App