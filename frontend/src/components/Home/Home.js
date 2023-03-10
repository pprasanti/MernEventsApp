import React from "react";
// import Card from "../UI/Card";
// import './../UI/Event.css'
// import './../Css/Common.css'

const Home = () => {

    return (
        <div className="event-item">
            <div className="event-card-block">
                <img className="event-img img-thumbnail" src="https://cdn.siasat.com/wp-content/uploads/2019/11/events-in-hyderabad-780x470.jpg" alt="" />
            </div>
            <div className="event-card-block">
                <h1 className="color-dark">Live Space Event Management</h1>
                <section>
                    <p>
                        Live Space Event Management is a full-service global event planning and
                        marketing agency based in Oakland, California. Innovation, excellence
                        and professionalism shape everything we do. Since 2000 Live Space Event
                        Management has been designing and producing brand-defining events and
                        experiences in the United States, Europe, Caribbean, Mexico and South
                        America.
                    </p>
                </section>
            </div>
        </div>

    )
}

export default Home

