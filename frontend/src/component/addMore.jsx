import React, { useState } from 'react';
import { saveTask } from '../services/task/taskService';
import Input from './common/input';

export default function AddMore ({ item, setNewItem }) {
  const [formData, setFormData] = useState({ name: '', category_id: '' });
  const [formErrors, setFormErrors] = useState({});

  const handleOnChange = ({ currentTarget: input }) => {
    const data = { ...formData };
    data[input.name] = input.value;
    data.category_id = item.id;
    setFormData(data);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await saveTask(formData);
      setNewItem(true);
      setFormData({ name: '', category_id: '' });
      setFormErrors({});
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        setFormErrors(ex?.response?.data?.error);
      }
    }
  };
;
  return (
    <div className="mt-5">
      <form onSubmit={handleFormSubmit}>
        <Input
          name="name"
          onChange={handleOnChange}
          errors={formErrors['name']}
          value={formData.name} // Pass the value from formData state
          placeholder="Enter your task"
        />
        <button type='submit' className="btn btn-block border w-100 mt-2">
          <i className="fa fa-plus fx-2" /> Add
        </button>
      </form>
    </div>
  );
}

