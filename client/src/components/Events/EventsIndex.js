
import React, { useEffect, useState } from 'react';
import axiosClient from '../../Utils/AxiosClient';
import { cityData } from '../../seeds/city';
import Events from './Events';
import useHttp from './../../hooks/use-http'
import NewEvent from './NewEvents';

const EventsIndex = () => {
    const [events, setEvents] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [cities, setCities] = useState(
        [{ _id: 0, name: "All Cities" }, ...cityData]
    );
    const [filteredCity, setFilteredCity] = useState('All Cities')

    const { isLoading, error, sendRequest: getEvents } = useHttp();

    useEffect(() => {
        const transformEvents = (eventsObj) => {
            setEvents(eventsObj)
            setIsAdding(true)
        }

        getEvents({
            url: '/events',
            method: 'GET',
        }, transformEvents)
    }, [isAdding, getEvents]);

    const addEventHandler = async (eventData) => {
        setIsAdding(true)
        setEvents((prevEvents) => prevEvents.concat(eventData));
        setIsAdding(false)
    }

    return (
        <React.Fragment>
            <NewEvent onAddEvent={addEventHandler} cities={cities}></NewEvent>
            {isLoading
                ? <> Loading ... </>
                : <Events cities={cities} events={events} filteredCity={filteredCity}
                    loading={isLoading}
                    error={error}
                    onAddEvent={addEventHandler} />
            }

        </React.Fragment>
    )
}

export default EventsIndex