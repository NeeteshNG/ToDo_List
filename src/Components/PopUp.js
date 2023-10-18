const { useState } = require("react");

const PopUp = ({ visible, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    visible && (
        <div className="popup-container">
            <div className="popup-content">
            <h2>Add / Update</h2>
            <label>Title : </label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description : </label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
  );
};

export default PopUp;