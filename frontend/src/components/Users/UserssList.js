
import Card from '../UI/Card'
import User from './User';
import '../UI/Users.css';
import React from 'react';

const UsersList = (props) => {
    return (
        <Card className="users">
            <ul>
                {props.users.map(user =>
                    <li key={user._id}>
                        <User key={user._id} user={user} />
                    </li>
                )}
            </ul>
        </Card>
    );
}

export default UsersList