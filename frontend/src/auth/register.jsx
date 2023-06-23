import React, { useState, useEffect } from "react";
import auth from "../services/auth/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const handleOnChange = ({ currentTarget: input }) => {
    const data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.register(formData);
      navigate('/task-boards');
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        setFormErrors( ex.response.data.error);
      }
    }
  }

  useEffect(() => {
    const checkCurrentUser = async () => {
      let currentUser = await auth.getCurrentUser();
      currentUser ? navigate("/task-boards") : navigate("/register");
    };

    checkCurrentUser();

  }, [navigate]);

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-header'>Register</div>
            <div className='card-body'>
              <form onSubmit={handleFormSubmit}>
                <div className='row mb-3'>
                    <label htmlFor='name' className='col-md-4 col-form-label text-md-right'> Full Name </label>
                    <div className='col-md-6'>
                        <input id='name' type='text' onChange={handleOnChange} className={`form-control ${ formErrors["name"] && "is-invalid"}`} name='name' value={formData["name"]} placeholder='Full Name' />
                        {formErrors["name"] && ( <span className='invalid-feedback' role='alert'> <strong>{formErrors["name"]}</strong></span>)}
                    </div>
                </div>
                <div className='row mb-3'>
                   <label htmlFor='email' className='col-md-4 col-form-label text-md-right'> E-Mail Address </label>
                   <div className='col-md-6'>
                        <input id='email' type='email' onChange={handleOnChange} className={`form-control ${ formErrors["email"] && "is-invalid"}`} name='email' value={formData["email"]} placeholder='Email Address' />
                        {formErrors["email"] && ( <span className='invalid-feedback' role='alert'> <strong>{formErrors["email"]}</strong></span> )}
                   </div>
                </div>
                <div className='row mb-3'>
                  <label htmlFor='password' className='col-md-4 col-form-label text-md-right'> Password </label>
                  <div className='col-md-6'>
                    <input id='password' type='password' onChange={handleOnChange} className={`form-control ${ formErrors["password"] && "is-invalid"}`} name='password' />
                    {formErrors["password"] && ( <span className='invalid-feedback' role='alert'> <strong>{formErrors["password"]}</strong></span> )}
                  </div>
                </div>
                <div className='row mb-0'>
                  <div className='col-md-8 offset-md-4'>
                    <button type='submit' className='btn btn-primary'> Register </button>
                    <Link to='/' className='btn btn-link'> Login </Link>
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
