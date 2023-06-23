import React, { useState } from "react";
import toast from "react-hot-toast";
import { saveTaskCategory } from './../../../services/task-category/taskCategoryService';
import { Link, useNavigate } from "react-router-dom";

export default function CreateTaskCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: ""});
  const [formErrors, setFormErrors] = useState({});

  const handleOnChange = ({ currentTarget: input }) => {
    const data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await saveTaskCategory(formData);
      toast.success('Task category created successfully.');
      navigate('/task-categories');
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        setFormErrors(ex.response.data.error);
      }
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-header'>Add Task Category</div>
            <div className='card-body'>
              <form onSubmit={handleFormSubmit}>
                <div className='row mb-3'>
                  <label htmlFor='name' className='col-md-4 col-form-label text-md-right'> Name </label>
                  <div className='col-md-6'>
                    <input id='name' type='text' onChange={handleOnChange} className={`form-control ${ formErrors["name"] && "is-invalid"}`} name='name' value={formData["name"]} placeholder='Enter a name...' />
                      {formErrors["name"] && (
                        <span className='invalid-feedback' role='alert'>
                          <strong>{formErrors["name"]}</strong>
                        </span>
                      )}
                  </div>
                </div>
                <div className='row mb-0'>
                  <div className='col-md-8 offset-md-4'>
                    <button type='submit' className='btn btn-primary'> Save </button>
                    <Link to='/task-boards' className='btn btn-link'>Back </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
