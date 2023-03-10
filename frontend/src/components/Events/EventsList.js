
import Card from '../UI/Card'
import Event from './Event';
import '../UI/Events.css';
import React, { Fragment, useEffect, useState } from 'react';
import NewEvent from './NewEvents';
// eslint-disable-next-line
// import { eventsSeed } from './../../seeds/event'
import axiosClient from '../../Utils/AxiosClient';
import { Link } from 'react-router-dom';
// import { useState } from 'react';

const EventsList = (props) => {
  const [events, setEvents] = useState(props.events);
  // eslint-disable-next-line
  const [error, setError] = useState('')
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem('user'))
  );

  const addEventHandler = (eventData) => {
    setEvents((prevEvents) => {
      return [eventData, ...events]
    })
  }

  return (
    <Fragment>
      <NewEvent onAddEvent={addEventHandler} cities={props.cities}></NewEvent>
      <Card className="events">
        {events.length > 0 && events.map(event =>
          // <Event key={event._id} event={event} />
          <div key={event._id} >
            <Card className="event-item flex-row">
              <div className="col-6 event-card-block">
                <img className="event-img" src={event.img} alt="" />
              </div>
              <div className="col-6 event-card-block">
                <h5 className="event-name">
                  <Link to={`/event/${event._id}`} className="link"> {event.name} </Link>
                </h5>
                <div className="event-description">{event.description}</div>
                <div className="card-price" style={{ color: ('Bangalore' === event.city) ? 'green' : 'blue' }}>{event.city}</div>
                <div className="card-price" style={{ color: ('Bangalore' === event.city) ? 'green' : 'blue' }}>{event.address}</div>
                <div className="card-price">{event.website}</div>
                <div className="card-price">{event.phone}</div>
                <div className="card-price">{event.priceStarts}</div>
                <section>
                  <form
                    action="/events/{ event._id}?_method=DELETE"
                    method="post"
                  >
                    {user ? (
                      <div className="flex-row">
                        <a href="/events/{ event._id}/edit">Edit</a>
                        <button className="btn btn-link">Delete</button>
                      </div>
                    ) : null}

                    <a href="/events/{ event._id}">View Comments</a>
                  </form>
                </section>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </Fragment>
  );
}

export default EventsList