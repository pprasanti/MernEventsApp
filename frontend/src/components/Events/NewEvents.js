import React from 'react';

import EventForm from './EventForm';
import './../UI/NewEvent.css';

const NewEvent = (props) => {

  const saveEventHandler = (eventData) => {
    const newEventData = {
      ...eventData,
      id: Math.random().toString()
    };

    console.log('newEventData : ');
    console.log(newEventData);

    props.onAddEvent(newEventData)
  }

  return (
    <div className='new-event'>
      <EventForm onSaveEvent={saveEventHandler}/>
    </div>
  );
};

export default NewEvent;