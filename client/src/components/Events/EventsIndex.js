
import React, { useEffect, useState } from 'react';
import axiosClient from '../../Utils/AxiosClient';
import { cityData } from '../../seeds/city';
import Events from './Events';

const EventsIndex = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
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
    }, [isAdding]);

    const addEventHandler = async (eventData) => {
        setIsAdding(true)

        const response = await axiosClient.post("/events", {
            ...eventData
        });
        
        console.log(response)

        if (response.status === 200 && response.data.length > 0) {
                const evn = await axiosClient.get(`/events`)
                setEvents(evn.data)
                setIsAdding(false)
        } else {
            setError({ title: "Event Error", message: "Error while saving Event" });
            setIsAdding(false)
            return false;
        }
    }

    return (
        <>
            {loading
                ? <> Loading ... </>
                : <Events cities={cities} events={events} filteredCity={filteredCity} onAddEvent={addEventHandler} />
            }
        </>
    )

}

export default EventsIndex