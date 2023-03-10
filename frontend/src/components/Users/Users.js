
import Card from '../UI/Card'
import '../UI/Users.css';
import React, { useState } from 'react';
import UsersList from './UsersList';
import UserFilter from './UserFilter';

const Users = (props) => {
    const [filteredCity, setFilteredCity] = useState('All Cities')

    const filterChangeHandler = (city) => {
        setFilteredCity(city)
    }

    const filteredUsers = props.users.filter((user) => (
        (filteredCity !== 'All Cities' && user.city === filteredCity)
        || (filteredCity === 'All Cities' && user.city !== filteredCity)))

    let usersContent = <p >No Users found.</p>;
    if(filteredUsers.length > 0 )
    {
        usersContent = <UsersList users={filteredUsers} />
    }

    return (
        <Card className="users">
            <UserFilter
                cities={props.cities}
                selected={filteredCity}
                onChangeFilter={filterChangeHandler}
            />
            {usersContent}
        </Card>
    );
}

export default Users