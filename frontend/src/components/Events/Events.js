
import Card from '../UI/Card'
import '../UI/Events.css';
import React, { useEffect, useState } from 'react';
import EventsList from './EventsList';
import EventFilter from './EventFilter';
import axiosClient from '../../Utils/AxiosClient';
import { cityData } from '../../seeds/city';

const Events = (props) => {
    const [filteredCity, setFilteredCity] = useState('All Cities')
    const [error, setError] = useState('')

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

    const eventContent = (filteredEvents.length > 0)
        ? <EventsList events={filteredEvents} cities={props.cities} />
        : <p >No Events found.</p>
    return (
        <>
            <Card className="events">
                <EventFilter
                    cities={props.cities}
                    selected={filteredCity}
                    onChangeFilter={filterChangeHandler}
                />
                {eventContent}
            </Card>
            {/* } */}
        </>
    )

}

export default Events