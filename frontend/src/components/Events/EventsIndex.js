
import Card from '../UI/Card'
import '../UI/Events.module.css';
import React, { useEffect, useState } from 'react';
// import EventsList from './EventsList';
// import EventFilter from './EventFilter';
import axiosClient from '../../Utils/AxiosClient';
import { cityData } from '../../seeds/city';
import Events from './Events';

const EventsIndex = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState(
        [{ _id: 0, name: "All Cities" }, ...cityData]
    );
    const [filteredCity, setFilteredCity] = useState('All Cities')
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        console.log("mmmmmm")

        const getEvents = async () => {
            const evn = await axiosClient.get(`/events`)
            setEvents(evn.data)
            setLoading(false)
        }
        getEvents();
    }, []);

    return (
        <>
            {loading
                ? <> Loading ... </>
                : <Events cities={cities} events={events} filteredCity={filteredCity} />
            }
        </>
    )

}

export default EventsIndex