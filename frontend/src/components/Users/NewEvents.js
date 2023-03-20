import React, {useState} from 'react';

import UserForm from './UserForm';
import './../UI/NewUser.css';

const NewUser = (props) => {
  const [isEditing, setIsEditing] = useState(false);


  const saveUserHandler = (userData) => {
    const newUserData = {
      ...userData,
      id: Math.random().toString()
    };

    props.onAddUser(newUserData)
    setIsEditing(false)
  }

  const startEditingHandler = () => {
    setIsEditing(true);
  }
  const stopEditingHandler = () => {
    setIsEditing(false);
  }

  return (
    <div className='new-user'>
      {!isEditing && <button onClick={startEditingHandler}>Add New User</button>}
      {isEditing && <UserForm onCancel={stopEditingHandler} onSaveUser={saveUserHandler} />}
    </div>
  );
};

export default NewUser;