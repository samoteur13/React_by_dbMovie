import React from "react";
import { TextField } from '@mui/material';

const DivForm = (props) => {

    return (
            <TextField
                margin="normal"
                fullWidth
                id={props.name}
                label={props.label}
                name={props.name}
                autoComplete={props.name}
                type={props.type}
                onChange={props.onChange}
                value={props.val}
                autoFocus
              />
    )
}

export default DivForm;