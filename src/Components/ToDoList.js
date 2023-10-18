import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "../ToDoSlice";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: 0, text: "" });
  
  const [checked, setChecked] = useState([]);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleSave = () => {
    if (currentTask.id === 0) {
      dispatch(addTodo({ id: nanoid(), title, description }));
    } else {
      dispatch(updateTodo({ id: currentTask.id, title, description }));
    }

    setTitle("");
    setDescription("");
    setCurrentTask({ id: 0, title: "" });
    closePopup();
  };

  const handleCheck = (taskId) => {
    if (checked.includes(taskId)) {
      setChecked(checked.filter(id => id !== taskId));
    } else {
      setChecked([...checked, taskId]);
    }
  };

  const handleAdd = () => {
    openPopup();
  };

  const handleUpdate = (id, title, description) => {
    setCurrentTask({ id, title, description });
    setTitle(title);
    setDescription(description);
    openPopup();
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="page-container">
      <h1>TODO LIST</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className={checked.includes(todo.id) ? "completed" : ""}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(todo.id)}
                    checked={checked.includes(todo.id)}
                  />
                </td>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td className="actions-button">
                  <button
                    onClick={() =>
                      handleUpdate(todo.id, todo.title, todo.description)
                    }
                    className="table-button"
                  >
                    Update
                  </button>
                  <button
                    className="table-button"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='table-button' onClick={handleAdd}>Add</button>
      {popupVisible && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="content">
              <h2>Add / Update</h2>
              <div className="form">
                <div className="inputBox">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <i>Title</i>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <i>Description</i>
                </div>
                <div className="inputBox">
                  <button className='button-56' onClick={handleSave}>Save</button>
                  <button className='button-56' onClick={closePopup}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
