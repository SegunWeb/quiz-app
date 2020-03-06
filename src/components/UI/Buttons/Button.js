import React from 'react';
import { Button } from "semantic-ui-react";

const ButtonUI = props => {

        return (
            <Button>{props.children}</Button>
        );
};

export default ButtonUI;