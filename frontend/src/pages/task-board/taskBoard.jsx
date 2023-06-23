import { useState } from "react";
import { useEffect } from "react";
import { getTaskCategories } from "../../services/task-category/taskCategoryService";
import { saveTask } from "../../services/task/taskService";
import "../../App.css";
import Task from "../task";

export default function TaskBoard() {
  const [categories, setCategories] = useState([]);

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
      const categoryIndex = tempCategories.findIndex(
        (category) => category.id === selectedItem.category_id
      ); // find the category Index
      const removeTaskIndex = tempCategories[categoryIndex].tasks.findIndex(
        (task) => task.id === selectedItem.id
      ); // find the selected item task index
      const removeTask = tempCategories[categoryIndex].tasks.splice(
        removeTaskIndex,
        1
      ); // remove task from existing category
      const updatedItemTask = { ...removeTask[0], category_id: destinationId }; //new task with updated category where task dropped
      tempCategories
        .find((category) => category.id === destinationId)
        .tasks.push(updatedItemTask); // update original category items
      saveTask(updatedItemTask);
      setCategories(tempCategories);
    }
  };

  const data = async () => {
    const { data } = await getTaskCategories();
    setCategories(data?.data);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-body">
          <div className="card-header text-center"> Task Board </div>
          <div className="row mt-2">
            {categories.map((category) => (
              <div className="col-4">
                <div className="bg-info" key={category.id} onDragOver={(e) => onDragOver(e)} onDrop={(e) => { onDrop(e, category.id); }}>
                  <div className="board-header">
                    <strong>{category.name}</strong>
                  </div>
                  <div className="board-body">
                    {category?.tasks?.map((task) => (
                      <Task key={task?.id} data={task} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
