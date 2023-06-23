const Select = ({ label, name, errors, options, placeholder, ...rest }) => {
    return (
      <div className='form-group'>
        <label className='required-star' htmlFor={name}>
          {label}
        </label>
  
        <select className='form-control' name={name} id={name} {...rest}>
          <option value=''>{placeholder}</option>
          {options.map((option) => (
            <option
              key={option._id ? option._id : option.name}
              value={option._id ? option._id : option.name}
            >
              {option.name}
            </option>
          ))}
        </select>
        {errors && <div className='alert alert-danger'>{errors}</div>}
      </div>
    );
  };
  
  export default Select;