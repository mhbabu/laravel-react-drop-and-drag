import React from "react";

const Input = ({name, errors, placeholder='', ...rest }) => {
  return (
    <div className='form-group mt-2'>
      <input className={`form-control ${ errors && "is-invalid"}`} name={name} placeholder={placeholder} {...rest} />
      {errors && (
        <span className='invalid-feedback' role='alert'>
          <strong>{errors}</strong>
        </span>
      )}
    </div>
  );
};

export default Input;