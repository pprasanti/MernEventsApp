import logo from './logo.svg';
import './App.css';
import EventList from './components/Events/Events';
import EventFilter from './components/Events/EventFilter';
import Navbar from './components/Partial/navbar';
import { eventsSeed, cityData } from './seeds/event'
import NewEvent from './components/Events/NewEvents';
import { useState } from 'react';


const App = () => {
  const [events, setEvents] = useState(
    eventsSeed
  );

  const [cities, setCities] = useState(
    ["All Cities", ...cityData]
  );

  const addEventHandler = (eventData) => {
    setEvents((prevEvents) => {
      return [eventData, ...events]
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
      </header>
      <body>
        <NewEvent onAddEvent={addEventHandler}></NewEvent>
        <EventList events={events} cities={cities}></EventList>
      </body>
    </div>
  );
}

export default App;
