import { useState } from "react"
import Card from "../UI/Card"
import './../UI/Card.css'
import './../UI/User.css'

const UserFilter = (props) => {
  const dropdownChangeHandler = (city) => {
    props.onChangeFilter(city.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by city</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {props.cities.map((city) =>
            <option value={city}>{city}</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default UserFilter