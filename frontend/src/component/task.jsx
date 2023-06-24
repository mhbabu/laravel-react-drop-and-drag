
export default function Task({ data: task }) {
  // When Drag Start
  const onDragStart = (ev, task) => {
    ev.dataTransfer.setData("task", JSON.stringify(task)); // Set Data in JSON stringify formatted.
  };

  return (
    <div className="bg-white p-2 border rounded mb-2" onDragStart={(e) => onDragStart(e, task)} draggable>
      <span>{task.name}</span>
    </div>
  );
}
