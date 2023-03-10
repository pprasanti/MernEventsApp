// import { useState } from "react"
// import Card from "../UI/Card"
import './../UI/Card.module.css'
import './../UI/Event.module.css'

const EventFilter = (props) => {
  const dropdownChangeHandler = (city) => {
    console.log(`city.target : ${city.target.value} - ${city.target} - ${city.target.html}`)
    props.onChangeFilter(city.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by city</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {
            props.cities.map((city) =>
              <option key={city.name} value={city.name}>{city.name}</option>
            )
          }
        </select>
      </div>
    </div>
  );
};

export default EventFilter