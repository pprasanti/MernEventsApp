import React, {useState} from 'react';

import EventForm from './EventForm';
import './../UI/NewEvent.css';

const NewEvent = (props) => {
  const [isEditing, setIsEditing] = useState(false);


  const saveEventHandler = (eventData) => {
    const newEventData = {
      ...eventData,
      id: Math.random().toString()
    };

    props.onAddEvent(newEventData)
    setIsEditing(false)
  }

  const startEditingHandler = () => {
    setIsEditing(true);
  }
  const stopEditingHandler = () => {
    setIsEditing(false);
  }

  return (
    <div className='new-event'>
      {!isEditing && <button onClick={startEditingHandler}>Add New Event</button>}
      {isEditing && <EventForm onCancel={stopEditingHandler} onSaveEvent={saveEventHandler} />}
    </div>
  );
};

export default NewEvent;