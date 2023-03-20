
import Card from '../UI/Card'
import eventCss from './Event.module.css';
import React, { useState } from 'react';
import EventsList from './EventsList';
import EventFilter from './EventFilter';

const Events = (props) => {
    const [filteredCity, setFilteredCity] = useState('All Cities')

    const filterChangeHandler = async (cityVal) => {
        console.log("yyyyyyy")

        const City = props.cities.find((city) => city.name == cityVal)
        console.log(City.name)
        setFilteredCity(City.name)
        console.log(`filteredCity : ${filteredCity}`)
    }

    const filteredEvents = props.events.filter((event) => (
        (filteredCity !== "All Cities" && event.city === filteredCity)
        || (filteredCity === "All Cities" && event.city !== filteredCity)))

    const addEventHandler = async (eventData) => {
        props.onAddEvent(eventData)
    }

    return (
        <>
            <Card className={eventCss.events}>
                <EventFilter
                    cities={props.cities}
                    selected={filteredCity}
                    onChangeFilter={filterChangeHandler}
                />
                <br />
                <EventsList events={filteredEvents} cities={props.cities} 
                loading={props.loading}
                error={props.error}
                onAddEvent={addEventHandler} />
            </Card>
            {/* } */}
        </>
    )

}

export default Events