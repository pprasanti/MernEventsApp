
import Card from '../UI/Card'
import Event from './Event';
import '../UI/Events.css';
import React from 'react';

const EventsList = (props) => {
    return (
        <Card className="events">
            {props.events.map(event =>
                <Event key={event._id} event={event} />
            )}
        </Card>
    );
}

export default EventsList