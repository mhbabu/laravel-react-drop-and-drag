import React from "react";
import { useLocation } from 'react-router-dom';
import Login from './auth/login';
import Register from "./auth/register";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./component/common/protectedRoute";
import TaskBoard from './pages/task-board/taskBoard';

function App() {

  const { pathname } = useLocation();

  return (
    <>
      <Toaster position="top-center" />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/task-boards' element={ <ProtectedRoute> <TaskBoard /> </ProtectedRoute> } />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;