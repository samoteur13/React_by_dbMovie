import React from "react";

const Input = (props) => {

    return (
        <div className="form-group">

            <label  htmlFor={props.name}><b>{props.label} </b> </label>
            <input className="form-control form-control-sm "
                id={props.name} 
                name={props.name}
                type={props.type}
                value={props.val}
                onChange={props.onChange}/>
        </div>
    )
}

export default Input;