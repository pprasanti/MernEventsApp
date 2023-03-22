import React, { useEffect, useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return { 
            focus: activate 
        };
    })

    return (
        <div
            className={
                `${classes.control} ${props.isValid === false ? classes.invalid : ''}`
            }
        >
            <label htmlFor={props.id}>{props.label} </label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                className="input"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            {props.error && !props.isValid && (<span className="error-text">{props.error}</span>)}
            {props.children}
        </div>
    );
});

export default React.memo(Input);
