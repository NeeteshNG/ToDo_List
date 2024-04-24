import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, deleteTodo, completeTodo } from "../ToDoSlice";
import { useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: 0, text: "" });

  const inputRef = useRef(null)
  const renderCount = useRef(0)

  renderCount.current += 1

  const openPopup = () => {
    setPopupVisible(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
    const todo = todos.find((t) => t.id === taskId)
    dispatch(completeTodo({ id : taskId, complete : !todo.complete }))
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
      <div className="text-container">
        <h3 className="counter">RENDER COUNT : {renderCount.current}</h3>
        <h1 className="head">TODO LIST</h1>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className={todo.complete ? "completed" : ""}>
                <td>
                  <input
                    type="checkbox"
                    name="checkbox"
                    onChange={() => handleCheck(todo.id)}
                    checked={todo.complete}
                  />
                </td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td className="actions-button">
                  <button
                    onClick={() =>
                      handleUpdate(todo.id, todo.title, todo.description)
                    }
                    id={todo.complete ? "disable-button" : ""}
                    disabled={todo.complete}
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
      <button className='button-29' onClick={handleAdd}>Add a Task</button>
      {popupVisible && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="content">
              <h2>Add / Update</h2>
              <div className="form">
                <div className="inputBox">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    ref={inputRef}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <i>Title</i>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <i>Description</i>
                </div>
                <div className="inputBox">
                  <button className='button-30' onClick={handleSave}>Save</button>
                  <button className='button-30' onClick={closePopup}>Cancel</button>
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
