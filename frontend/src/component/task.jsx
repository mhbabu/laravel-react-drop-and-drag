import { useState } from "react";
import Popup from "./common/popup";
import AssignUser from "./assignUser";

export default function Task({ data: task }) {
  const [show, setShow] = useState(false);
  // When Drag Start
  const onDragStart = (ev, task) => {
    ev.dataTransfer.setData("task", JSON.stringify(task)); // Set Data in JSON stringify formatted.
  };

  const handleClick = () => {
    setShow(true);
  };

  return (
    <>
      <div
        className="bg-white p-2 border rounded mb-2"
        onDragStart={(e) => onDragStart(e, task)}
        draggable
        onClick={handleClick}
      >
        <span>{task.name}</span>
      </div>
      <Popup title="Assign Users" show={show} setShow={setShow}>
        <AssignUser show={show} setShow={setShow} data={task} />
      </Popup>
    </>
  );
}
