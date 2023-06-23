import React from "react";

const Input = ({name, placeholder='', ...rest }) => {
  return (
    <div className='form-group mt-2'>
      <input className='form-control' name={name} placeholder={placeholder} {...rest} />
    </div>
  );
};

export default Input;