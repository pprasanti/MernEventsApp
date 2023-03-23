import React,{ useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Modal from '../UI/Modal';
import classes from './EventModal.module.css';
import Card from './../UI/Card';
import eventCss from './Event.module.css';
import axiosClient from '../../utils/AxiosClient';

const EventModal = (props) => {

    // const eventId = useLocation().pathname.split('/')[2] ?? 0
    const [event, setEvent] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem('user'))
    );

    React.useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        const getEvent = () => {
            axiosClient.get(`/events/${props.eventId}`)
                .then(res => {
                    setEvent(res.data);
                })
                .catch(err => {
                    setError(err.message);
                })
        }
        getEvent();
    }, []);

    return (
        <Modal onClose={props.onClose}>
            <div>
                <Card className={eventCss.item}>
                    <div className={eventCss.card_block}>
                        <img className={eventCss.img} src={event.img} alt="" />
                    </div>
                    <div className={eventCss.card_block}>
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
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default EventModal
