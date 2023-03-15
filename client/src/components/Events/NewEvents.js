import React, {useState} from 'react';
import Button from '../UI/Button';

import EventForm from './EventForm';
import './NewEvent.module.css';

const NewEvent = (props) => {
  const [isEditing, setIsEditing] = useState(false);


  const saveEventHandler = async (eventData) => {
    const newEventData = {
      ...eventData,
      id: Math.random().toString()
    };

    await props.onAddEvent(newEventData)
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
      {!isEditing && <Button onClick={startEditingHandler}>Add New Event</Button>}
      {isEditing && <EventForm onCancel={stopEditingHandler} onSaveEvent={saveEventHandler} cities={props.cities}/>}
    </div>
  );
};

export default NewEvent;