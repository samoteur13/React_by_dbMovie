import React from 'react';

const Button = (props) => {

    return(
        <button onClick={props.action} className="btn btn-sm btn-outline-secondary " >{props.label}</button>
    )
}

export default Button;