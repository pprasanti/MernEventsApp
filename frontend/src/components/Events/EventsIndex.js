
import React, { useEffect, useState } from 'react';
import axiosClient from '../../utils/AxiosClient';
import { cityData } from '../../seeds/city';
import Events from './Events';
import useHttp from './../../hooks/use-http'
import NewEvent from './NewEvents';

const EventsIndex = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [events, setEvents] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [cities, setCities] = useState(
        [{ _id: 0, name: "All Cities" }, ...cityData]
    );
    const [filteredCity, setFilteredCity] = useState('All Cities')

    useEffect(() => {
        setLoading(true)

        const getEvents = async () => {
            await axiosClient.get(`/events`)
                .then(res => {
                    console.log(res.data.data);
                    setEvents(res.data.data);
                })
                .catch(err => {
                    setError(err.message);
                })
            setIsAdding(false)
            setLoading(false)
        }
        getEvents();
    }, []);

    const addEventHandler = async (eventData) => {
        setIsAdding(true)
        setEvents((prevEvents) => prevEvents.concat(eventData));
        setIsAdding(false)
    }

    return (
        <React.Fragment>
            <NewEvent onAddEvent={addEventHandler} cities={cities}></NewEvent>
            {loading
                ? <> Loading ... </>
                : <Events cities={cities} events={events} filteredCity={filteredCity}
                    loading={loading}
                    error={error}
                    onAddEvent={addEventHandler} />
            }

        </React.Fragment>
    )
}

export default EventsIndex