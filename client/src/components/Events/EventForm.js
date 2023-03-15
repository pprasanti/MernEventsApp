import React, { useState } from 'react';

import classes from './EventForm.module.css';
// import { cityData } from './../../seeds/city'
import EventFilter from './../../components/Events/EventFilter'
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';
import Button from '../UI/Button';
import Input from '../UI/Input';

const EventForm = (props) => {
    const [filteredCity, setFilteredCity] = useState('All Cities')
    const [error, setError] = useState();

    const [userInput, setUserInput] = useState({city: filteredCity})

    const nameChangeHandler = (event) => {
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

    const submitHandler = async (event) => {
        event.preventDefault();

        console.log(userInput.city)
        if (userInput.name.length === 0 || userInput.city === "All Cities") {
            setError({
                title: "Validation Error",
                message: "Name & City Required"
            });
            return
        }

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

        await props.onSaveEvent(eventData)
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

    const errorHandler = () => {
        setError(null)
    }


    return (
        <Wrapper>
            {error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message}></ErrorModal>}
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <div className={classes.control}>
                            <label >Name</label>
                            <input type='text' value={userInput.name} onChange={nameChangeHandler} />
                        </div>
                        <div className={classes.control}>
                            <label>Description</label>
                            <input type='text' value={userInput.description} onChange={descChangeHandler} />
                        </div>
                        <div className={classes.control}>
                            <label>address</label>
                            <input type='text' value={userInput.address} onChange={addChangeHandler} />
                        </div>
                        <br/>
                        <EventFilter
                            cities={props.cities}
                            selected={filteredCity}
                            onChangeFilter={filterChangeHandler}
                        />
                        <br/>
                        <div className={classes.control}>
                            <label>website</label>
                            <input type='text' value={userInput.website} onChange={websiteChangeHandler} />
                        </div>
                        <div className={classes.control}>
                            <label>priceStarts</label>
                            <input type='text' value={userInput.priceStarts} onChange={priceChangeHandler} />
                        </div>
                        <div className={classes.control}>
                            <label>img</label>
                            <input type='text' value={userInput.img} onChange={imgChangeHandler} />
                        </div>
                        <div className={classes.control}>
                            <label>phone</label>
                            <input type='text' value={userInput.phone} onChange={phoneChangeHandler} />
                        </div>
                    </div>
                    <div className={classes.actions}>
                        <Button type="button" onClick={props.onCancel}>Cancel</Button>&nbsp;
                        <Button type='submit'>Add Event</Button>
                    </div>
                </form>
            </div >
        </Wrapper >
    );
};

export default EventForm;