import React, { useState } from "react"
// eslint-disable-next-line
import { Button } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import axiosClient from './../../Utils/AxiosClient'
import Card from "../UI/Card"
import './../UI/Card.module.css'
import './../UI/Event.module.css'
import './../UI/Events.module.css'

const Event = () => {

    const eventId = useLocation().pathname.split('/')[2] ?? 0
    const [event, setEvent] = useState('')
    // eslint-disable-next-line
    const [error, setError] = useState('')

    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem('user'))
    );

    React.useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        console.log(eventId);

        const getEvent = () => {
            axiosClient.get(`/events/${eventId}`)
                .then(res => {
                    console.log(res.data);
                    setEvent(res.data);
                })
                .catch(err => {
                    setError(err.message);
                })
        }
        getEvent();
    }, [eventId]);

    return (
        <div>
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
    );
}

export default Event