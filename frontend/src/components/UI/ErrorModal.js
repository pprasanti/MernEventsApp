import React from "react";
import Card from "./Card";

const ErrorModal = (props) => {
    return (
        <Card>
            <header>
                <h2>{props.title}</h2>
            </header>
            <body>
                <p>{props.message}</p>
            </body>
        </Card>
    )
}

export default ErrorModal