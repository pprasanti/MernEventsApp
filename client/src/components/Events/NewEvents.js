import React, { useContext, useState } from 'react';
import Button from '../UI/Button';
import EventForm from './EventForm';
import './NewEvent.module.css';
import AuthContext from './../../context/auth-context'
import ErrorModal from '../UI/ErrorModal';
import useHttp from './../../hooks/use-http'
import classes from './NewEvent.module.css';
import axiosClient from '../../Utils/AxiosClient';

const NewEvent = (props) => {
  const authCtx = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  // const { isLoading, error, sendRequest: addEvent } = useHttp();

  // const createEvent = async (eventData, eventObj) => {
  //   const createdEvent = ({ id: eventObj.name, ...eventData })

  //   await props.onAddEvent(createdEvent)
  //   setIsEditing(false)
  // }

  const saveEventHandler = async (eventData) => {
    // addEvent({
    //   url: '/events',
    //   method: 'POST',
    //   // onSuccess: (res) => {
    //   //     setEvents(res.data);
    //   // }
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: { text: 'taskText' },
    //   // body: eventData
    // }, createEvent.bind(null, eventData))

    let createdEvent = await axiosClient.post('/events', eventData)
    createdEvent = ({ id: createdEvent.name, ...createdEvent })
    await props.onAddEvent(createdEvent)
    setIsEditing(false)
  }

  const startEditingHandler = () => {
    setIsEditing(true);
  }
  const stopEditingHandler = () => {
    setIsEditing(false);
  }

  return (
    <div className={classes.form}>
      {authCtx.error && (
        <ErrorModal
          title={authCtx.error.title}
          message={authCtx.error.message}
          onConfirm={authCtx.onErrorConfirm}
        />
      )}
      {!isEditing && <Button onClick={startEditingHandler}>Add New Event</Button>}
      {isEditing && <EventForm
        loading={props.isLoading}
        onCancel={stopEditingHandler}
        onSaveEvent={saveEventHandler}
        cities={props.cities}
      />}
    </div>
  );
};

export default NewEvent;