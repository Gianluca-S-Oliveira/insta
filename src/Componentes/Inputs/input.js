import React from 'react';
import "./customInput.scss"
const InputDefault = ({ placeholder, value, type, icon, onChange }) => {
    return (
        <div className="custom-input">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                className="custom-input"
                onChange={(e) => onChange(e)}
            />
            <i >{icon}</i>
        </div>
    );
}

export default InputDefault;
