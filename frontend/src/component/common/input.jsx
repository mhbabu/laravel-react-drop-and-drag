import React from "react";

const Input = ({ label, name, errors, placeholder='', ...rest }) => {
  return (
    <div className='form-group'>
      {label &&  <label htmlFor={name} className='required-star'> {label}</label> }
      <input className='form-control' id={name} name={name} placeholder={placeholder} {...rest} />
      {errors && <div className='alert alert-danger'>{errors}</div>}
    </div>
  );
};

export default Input;