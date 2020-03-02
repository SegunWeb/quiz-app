import React from 'react';
import {Form} from "semantic-ui-react";


const SelectIn = (props) =>  {
    const htmlFor = `${props.label}-${Math.random()}`;

    return (
        <Form.Field>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                className='qc-select'
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {
                    props.options.map((option, i) => {
                    return (
                        <option
                            value={option.value}
                            key={option.value + i}
                        >
                            {option.text}
                        </option>
                    )
                    })
                }
            </select>
        </Form.Field>
    );
};

export default SelectIn;