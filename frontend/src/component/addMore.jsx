import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import Input from './common/input';

const AddMore = forwardRef(({ item, data, setData }, ref) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', category_id: '' });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      category_id: item?.id,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Handle form submission logic here
    // ...
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleFormSubmit(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    submitForm: handleFormSubmit,
  }));

  return (
    <div className="mt-5">
      <form onSubmit={handleFormSubmit}>
        <Input
          ref={formRef}
          name="name"
          onChange={handleOnChange}
          value={formData.name} // Pass the value from formData state
          placeholder="Enter your task"
        />
        <button className="btn btn-block border w-100 mt-2">
          <i className="fa fa-plus fx-2" /> Add
        </button>
      </form>
    </div>
  );
});

export default AddMore;
