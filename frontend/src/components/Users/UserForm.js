import React, { useState } from 'react';

import './../UI/UserForm.css';
import { cityData } from './../../seeds/user'
import UserFilter from './../../components/Users/UserFilter'
import ErrorModal from '../UI/ErrorModal';

const UserForm = (props) => {
    const [filteredCity, setFilteredCity] = useState('All Cities')
    const [error, setError] = useState()

    const [userInput, setUserInput] = useState({
        name: 'User 1',
        description: 'User 1 Desc',
        address: 'Address 1',
        city: 'Pune',
        website: 'www.userXyz1.com',
        priceStarts: 100000,
        img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        phone: 9886731992,
    })

    const nameChangeHandler = (user) => {
        setUserInput((prevState) => {
            return { ...prevState, name: user.target.value }
        })
    }

    const descChangeHandler = (user) => {
        setUserInput((prevState) => {
            return { ...prevState, description: user.target.value }
        })
    }

    const addChangeHandler = (user) => {
        setUserInput((prevState) => {
            return { ...prevState, address: user.target.value }
        })
    }

    const filterChangeHandler = (city) => {
        setUserInput((prevState) => {
            alert(city)
            setFilteredCity(city)
            return { ...prevState, city: city }
        })
    }

    const websiteChangeHandler = (user) => {
        setUserInput((prevState) => {
            return { ...prevState, website: user.target.value }
        })
    }

    const priceChangeHandler = (user) => {
        setUserInput((prevState) => {
            return { ...prevState, price: user.target.value }
        })
    }

    const imgChangeHandler = (user) => {
        setUserInput((prevState) => {
            return { ...prevState, img: user.target.value }
        })
    }

    const phoneChangeHandler = (user) => {
        setUserInput((prevState) => {
            return { ...prevState, phone: user.target.value }
        })
    }

    const submitHandler = (user) => {
        user.pruserDefault();

        if (userInput.name.length === 0 || userInput.city.length === 0) {
            setError({
                title: "Validation Error",
                message: "Name & City Required"
            })
            return
        }

        const userData = {
            name: userInput.name,
            description: userInput.description,
            address: userInput.address,
            city: userInput.city,
            website: userInput.website,
            priceStarts: userInput.priceStarts,
            img: userInput.img,
            phone: userInput.phone,
        }

        console.log(userData)

        props.onSaveUser(userData)
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
        <div>
            {error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message}></ErrorModal>}
            <card>
                <form onSubmit={submitHandler}>
                    <div className='new-user__controls'>
                        <div className='new-user__control'>
                            <label>Name</label>
                            <input type='text' value={userInput.name} onChange={nameChangeHandler} />
                        </div>
                        <div className='new-user__control'>
                            <label>Description</label>
                            <input type='text' value={userInput.description} onChange={descChangeHandler} />
                        </div>
                        <div className='new-user__control'>
                            <label>address</label>
                            <input type='text' value={userInput.address} onChange={addChangeHandler} />
                        </div>
                        <UserFilter
                            cities={['All Cities', ...cityData]}
                            selected={filteredCity}
                            onChangeFilter={filterChangeHandler}
                        />
                        <div className='new-user__control'>
                            <label>website</label>
                            <input type='text' value={userInput.website} onChange={websiteChangeHandler} />
                        </div>
                        <div className='new-user__control'>
                            <label>priceStarts</label>
                            <input type='text' value={userInput.priceStarts} onChange={priceChangeHandler} />
                        </div>
                        <div className='new-user__control'>
                            <label>img</label>
                            <input type='text' value={userInput.img} onChange={imgChangeHandler} />
                        </div>
                        <div className='new-user__control'>
                            <label>phone</label>
                            <input type='text' value={userInput.phone} onChange={phoneChangeHandler} />
                        </div>
                    </div>
                    <div className='new-user__actions'>
                        <button type="button" onClick={props.onCancel}>Cancel</button>
                        <button type='submit'>Add User</button>
                    </div>
                </form>
            </card>
        </div>
    );
};

export default UserForm;