import './App.css';
import React from 'react';
import TopBar from './components/Partial/TopBar';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Event from './components/Events/Event';
import EventsIndex from './components/Events/EventsIndex';
import Login from './components/Auth/Login';

// const App = () => {

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TopBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsIndex />} />
            <Route path="/event/:eventId" element={<Event />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<SignUpPage />} /> */}

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App