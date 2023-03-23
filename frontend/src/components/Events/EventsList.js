
import Card from '../UI/Card'
import eventCss from './Event.module.css';
import React, { Fragment, useState } from 'react';
import NewEvent from './NewEvents';
import { Link } from 'react-router-dom';
import axiosClient from '../../utils/AxiosClient';
import EventModal from './EventModal';
import Button from '../UI/Button';

const EventsList = (props) => {
  const [events, setEvents] = useState(props.events);
  const [selectedEvent, setSelectedEvent] = useState();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem('user'))
  );

  const handleSelect = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleOnCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(undefined);
  };

  return (
    <Fragment>
      <div className={eventCss.events}>
        {
          (events.length > 0 &&
            events.map(event =>
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
                      {/* <Link to={`/event/${event._id}`} className="link"> {event.name} </Link> */}
                      <Link className="link"
                        onClick={() => handleSelect(event)}
                      > {event.name} </Link>
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
            ))}
        {events.length <= 0 && <p >No Events found.</p>}
        {showModal && <EventModal isOpen={showModal} onClose={handleOnCloseModal} eventId={selectedEvent._id} />}
      </div >
    </Fragment >
  );
}

export default EventsList