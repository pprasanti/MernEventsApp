import { useState } from "react"
import Card from "../UI/Card"
import './../UI/Card.css'
import './../UI/User.css'
import './../UI/Users.css'
import eventCss from '../UI/Event.module.css';

const User = (props) => {
    const [name, setName] = useState(
        props.user.name
    );

    const clickHandler = () => {
        setName("Updated")
    }

    const user = props.user
    return (
        <Card className="user-item">
            <div className="user-card-block">
                {/* <div className="col-md-4 align-middle" mb-3> */}
                <img className="user-img" src={user.img} alt="" />
                {/* </div> */}
            </div>
            <div className="user-card-block">
                <h5 className="user-name">
                    <a href='/users/{user._id}'> {name} </a>
                </h5>
                <div className="user-description">{user.description}</div>
                {/* <div className={`card-price ${!user.city ? 'green' : 'blue'}`}>{user.city}</div> */}
                <div className={eventCss.card_rice} style={{color: ('Bangalore' === user.city)? 'green' : 'blue'}}>{user.city}</div>
                <div className={eventCss.card_rice} style={{color: ('Bangalore' === user.city)? 'green' : 'blue'}}>{user.address}</div>
                <div className={eventCss.card_rice}>{user.website}</div>
                <div className={eventCss.card_rice}>{user.phone}</div>
                <div className={eventCss.card_rice}>{user.priceStarts}</div>
                <button onClick={clickHandler} className="btn btn-link">Edit</button>

                <section>
                    <form
                        action="/users/{ user._id}?_method=DELETE"
                        method="post"
                    >

                        <a href="/users/{ user._id}/edit">Edit</a>
                        <a href="/users/{ user._id}">View Comments</a>

                        <button className="btn btn-link">Delete</button>
                    </form>
                </section>
            </div>
        </Card>
    );
}

export default User