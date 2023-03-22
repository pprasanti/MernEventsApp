import React from 'react';
import Input from '../components/UI/Input';


function createFormFieldConfig(label, name, type, defaultValue = "") {
    return {
        renderInput: (handleChange, value, isValid, error, key) => {
            return (
                <Input
                    key={key}
                    name={name}
                    type={type}
                    label={label}
                    isValid={isValid}
                    value={value}
                    className="input"
                    placeholder={`Enter Your ${label}`}
                    onChange={handleChange}
                    error={error}
                />
            )
        },
        label,
        value: defaultValue,
        valid: false,
        error: "",
        touched: false,
    }
}

export const signupForm = {
    firstName: {
        ...createFormFieldConfig("First Name", "firstName", "text")
    },
    lastName: {
        ...createFormFieldConfig("Last Name", "lastName", "text")
    },
    email: {
        ...createFormFieldConfig("Email", "email", "email")
    },
    password: {
        ...createFormFieldConfig("Password", "password", "password")
    }
    ,
    confirmPassword: {
        ...createFormFieldConfig("Confirm Password", "confirmPassword", "password")
    },
    phone: {
        ...createFormFieldConfig("Phone", "phone", "text")
    },
}