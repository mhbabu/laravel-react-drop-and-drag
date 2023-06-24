import React, { useState, useEffect } from "react";
import MultiSelectWithSearch from "./common/multiSelectWithSearch";
import { getUserList } from "../services/auth/authService";
import { assignTaskToUsers } from "../services/task/taskService";

export default function AssignUser({ show, setShow, data, setData }) {

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const handleClose = (event) => {
    event.preventDefault();
    setShow(!show);
  };

  const handleSelectChange = (selectedUsers) => {
    setSelectedUsers(selectedUsers);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await assignTaskToUsers({users: selectedUsers, task_id: data?.id });
    //   setNewItem(true);
    //   setFormData({ name: '', category_id: '' });
    //   setFormErrors({});
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        console.log(ex?.response?.data?.error);
      }
    }
  };

  const userList = async () => {
    const users = await getUserList();
    setUsers(users);
  };

  useEffect(() => {
    userList(); 
  }, []);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <MultiSelectWithSearch data={users} onChange={handleSelectChange} value={selectedUsers} placeholder="Select Users" />
          </div>
        </div>
        <hr />
        <div className="float-end">
          <button onClick={(event) => handleClose(event)} className="text-capitalize btn btn-danger m-1">
            <i className="fa fa-times-circle mr-1" /> Close
          </button>
          <button type="submit" className="text-capitalize ml-1 btn btn-primary m-1">
            <i className="fa fa-users mr-1" /> Assign Users
          </button>
        </div>
      </form>
    </>
  );
}
