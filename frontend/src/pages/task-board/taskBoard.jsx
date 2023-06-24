import { useState, useEffect } from "react";
import { getTaskCategories } from "../../services/task-category/taskCategoryService";
import { saveTask } from "../../services/task/taskService";
import AddMore from "../../component/addMore";
import Task from "../../component/task";
import {useNavigate} from 'react-router-dom';
import "../../App.css";
import { logout } from "../../services/auth/authService";

export default function TaskBoard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState(false);

  // When Drag Over
  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  // When Item dropped into To Do, In Progress or Done Area
  const onDrop = (ev, destinationId) => {
    ev.preventDefault();
    let selectedItem = JSON.parse(ev.dataTransfer.getData("task")); // Retrive data from JSON stringify
    if (destinationId !== selectedItem.category_id) {
      const tempCategories = [...categories]; // clone all categories with tasks
      const categoryIndex = tempCategories.findIndex( (category) => category.id === selectedItem.category_id ); // find the category Index
      const removeTaskIndex = tempCategories[categoryIndex].tasks.findIndex( (task) => task.id === selectedItem.id ); // find the selected item task index
      const removeTask = tempCategories[categoryIndex].tasks.splice( removeTaskIndex, 1); // remove task from existing category
      const updatedItemTask = { ...removeTask[0], category_id: destinationId }; //new task with updated category where task dropped
      tempCategories.find((category) => category.id === destinationId).tasks.push(updatedItemTask); // update original category items
      saveTask(updatedItemTask);
      setCategories(tempCategories);
    }
  };

  const handleLogOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }
  const data = async () => {
    const { data } = await getTaskCategories();
    setCategories(data?.data);
  };

  useEffect(() => {
    if(categories.length === 0) data();
    if(newItem){
      data();
      setNewItem(false);
    }
  }, [categories, newItem]);

  return (
    <div className="container mt-3">
      <div className="card">
          <div className="card-header text-center justify-content-between"> 
            <h5>Task Board</h5>
            <p onClick={handleLogOut} style={{ cursor: "pointer" }}><i className="fa fa-user"></i> Logout</p>
          </div>
        <div className="card-body">
          <div className="row mt-2">
            {categories.map((category, index) => (
              <div className="col-4" key={category.id}>
                <div onDragOver={(e) => onDragOver(e)} onDrop={(e) => { onDrop(e, category.id); }}>
                  <div className="board-header">
                    <strong>{category.name}</strong>
                  </div>
                  <div className="board-body">
                    {category?.tasks?.map((task) => (
                      <Task key={task?.id} data={task} />
                    ))}
                  </div>
                </div>
                <AddMore key={index} item={category} setNewItem={setNewItem} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
