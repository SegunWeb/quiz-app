import React from 'react';
import {Form} from "semantic-ui-react";



function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = (props) =>  {
    const inputType = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    return (
        <Form.Field>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props) ?
                    <span style={{color: 'red'} }>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }


        </Form.Field>
    );
};

export default Input;