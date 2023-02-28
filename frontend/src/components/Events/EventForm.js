import React, { useState } from 'react';

import './../UI/EventForm.css';
import {cityData} from './../../seeds/event'
import EventFilter from './../../components/Events/EventFilter'

const EventForm = (props) => {
    const [filteredCity, setFilteredCity] = useState('All Cities')

    const [userInput, setUserInput] = useState({
        name: 'Event 1',
        description: 'Event 1 Desc',
        address: 'Address 1',
        city: 'Pune',
        website: 'www.xyz1.com',
        priceStarts: 100000,
        img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        phone: 9886731992,
    })

    const nameChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput,
        //     name: event.target.value
        // })
        setUserInput((prevState) => {
            return { ...prevState, name: event.target.value }
        })
    }

    const descChangeHandler = (event) => {
        setUserInput((prevState) => {
            return { ...prevState, description: event.target.value }
        })
    }

    const addChangeHandler = (event) => {
        setUserInput((prevState) => {
            return { ...prevState, address: event.target.value }
        })
    }

    const filterChangeHandler = (city) => {
        setUserInput((prevState) => {
            alert(city)
            setFilteredCity(city)
            return { ...prevState, city: city }
        })
    }

    const websiteChangeHandler = (event) => {
        setUserInput((prevState) => {
            return { ...prevState, website: event.target.value }
        })
    }

    const priceChangeHandler = (event) => {
        setUserInput((prevState) => {
            return { ...prevState, price: event.target.value }
        })
    }

    const imgChangeHandler = (event) => {
        setUserInput((prevState) => {
            return { ...prevState, img: event.target.value }
        })
    }

    const phoneChangeHandler = (event) => {
        setUserInput((prevState) => {
            return { ...prevState, phone: event.target.value }
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const eventData = {
            name: userInput.name,
            description: userInput.description,
            address: userInput.address,
            city: userInput.city,
            website: userInput.website,
            priceStarts: userInput.priceStarts,
            img: userInput.img,
            phone: userInput.phone,
        }

        console.log(eventData)

        props.onSaveEvent(eventData)
        setUserInput({
            name: '',
            description: '',
            address: '',
            city: '',
            website: '',
            priceStarts: '',
            img: '',
            phone: '',
        })
    }


    return (
        <form onSubmit={submitHandler}>
            <div className='new-event__controls'>
                <div className='new-event__control'>
                    <label>Name</label>
                    <input type='text' value={userInput.name} onChange={nameChangeHandler} />
                </div>
                <div className='new-event__control'>
                    <label>Description</label>
                    <input type='text' value={userInput.description} onChange={descChangeHandler} />
                </div>
                <div className='new-event__control'>
                    <label>address</label>
                    <input type='text' value={userInput.address} onChange={addChangeHandler} />
                </div>
                <EventFilter
                cities={['All Cities', ...cityData]}
                selected={filteredCity}
                onChangeFilter={filterChangeHandler}
                />
                <div className='new-event__control'>
                    <label>website</label>
                    <input type='text' value={userInput.website} onChange={websiteChangeHandler} />
                </div>
                <div className='new-event__control'>
                    <label>priceStarts</label>
                    <input type='text' value={userInput.priceStarts} onChange={priceChangeHandler} />
                </div>
                <div className='new-event__control'>
                    <label>img</label>
                    <input type='text' value={userInput.img} onChange={imgChangeHandler} />
                </div>
                <div className='new-event__control'>
                    <label>phone</label>
                    <input type='text' value={userInput.phone} onChange={phoneChangeHandler} />
                </div>
            </div>
            <div className='new-event__actions'>
                <button type='submit'>Add Event</button>
            </div>
        </form>
    );
};

export default EventForm;