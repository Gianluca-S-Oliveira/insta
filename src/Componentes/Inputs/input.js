import React from 'react';
import "./customInput.scss"
const InputDefault = ({ placeholder, value, type, icon }) => {
    return (
        <div className="custom-input">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
            />
            <i >{icon}</i>
        </div>
    );
}

export default InputDefault;
