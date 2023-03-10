
import Card from '../UI/Card'
import eventCss from './Event.module.css';
import React, { Fragment, useState } from 'react';
import NewEvent from './NewEvents';
import { Link } from 'react-router-dom';

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
      <div className={eventCss.events}>
        {events.length > 0 && events.map(event =>
          // <Event key={event._id} event={event} />
          <div key={event._id} >
            <Card className={eventCss.item}>
              <div 
              className={eventCss.card_block}
              >
                <img className={eventCss.img} src={event.img} alt="" />
              </div>
              <div 
              className={eventCss.card_block} 
              >
                <h5 className={eventCss.name}>
                  <Link to={`/event/${event._id}`} className="link"> {event.name} </Link>
                </h5>
                <div className={eventCss.description}>{event.description}</div>
                <div className={eventCss.card_rice} style={{ color: ('Bangalore' === event.city) ? 'green' : 'blue' }}>{event.city}</div>
                <div className={eventCss.card_rice} style={{ color: ('Bangalore' === event.city) ? 'green' : 'blue' }}>{event.address}</div>
                <div className={eventCss.card_rice}>{event.website}</div>
                <div className={eventCss.card_rice}>{event.phone}</div>
                <div className={eventCss.card_rice}>{event.priceStarts}</div>
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
          </div >
        )}
      </div >
    </Fragment >
  );
}

export default EventsList