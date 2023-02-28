
import Card from '../UI/Card'
import '../UI/Events.css';
import React, { useState } from 'react';
import EventsList from './EventsList';
import EventFilter from './EventFilter';

const Events = (props) => {
    const [filteredCity, setFilteredCity] = useState('All Cities')

    const filterChangeHandler = (city) => {
        setFilteredCity(city)
    }

    const filteredEvents = props.events.filter((event) => (
        (filteredCity !== 'All Cities' && event.city === filteredCity)
        || (filteredCity === 'All Cities' && event.city !== filteredCity)))


    return (
        <Card className="events">
            <EventFilter
                cities={props.cities}
                selected={filteredCity}
                onChangeFilter={filterChangeHandler}
            />
            {filteredEvents.length <= 0 ? (
                <p >No Events found.</p>
            ) : (
                <EventsList events={filteredEvents} />
            )}
        </Card>
    );
}

export default Events