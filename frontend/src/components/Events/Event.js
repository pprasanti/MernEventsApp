import { useState } from "react"
import Card from "../UI/Card"
import './../UI/Card.css'
import './../UI/Event.css'
import './../UI/Events.css'

const Event = (props) => {
    const [name, setName] = useState(
        props.event.name
    );

    const clickHandler = () => {
        setName("Updated")
    }

    const event = props.event
    return (
        <Card className="event-item">
            <div className="event-card-block">
                {/* <div className="col-md-4 align-middle" mb-3> */}
                <img className="event-img" src={event.img} alt="" />
                {/* </div> */}
            </div>
            <div className="event-card-block">
                <h5 className="event-name">
                    <a href='/events/{event._id}'> {name} </a>
                </h5>
                <div className="event-description">{event.description}</div>
                {/* <div className={`card-price ${!event.city ? 'green' : 'blue'}`}>{event.city}</div> */}
                <div className="card-price" style={{color: ('Bangalore' === event.city)? 'green' : 'blue'}}>{event.city}</div>
                <div className="card-price" style={{color: ('Bangalore' === event.city)? 'green' : 'blue'}}>{event.address}</div>
                <div className="card-price">{event.website}</div>
                <div className="card-price">{event.phone}</div>
                <div className="card-price">{event.priceStarts}</div>
                <button onClick={clickHandler} className="btn btn-link">Edit</button>

                <section>
                    <form
                        action="/events/{ event._id}?_method=DELETE"
                        method="post"
                    >

                        <a href="/events/{ event._id}/edit">Edit</a>
                        <a href="/events/{ event._id}">View Comments</a>

                        <button className="btn btn-link">Delete</button>
                    </form>
                </section>
            </div>
        </Card>
    );
}

export default Event