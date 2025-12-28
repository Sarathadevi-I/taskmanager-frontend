import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";
import { Link } from "react-router-dom";
const CreateItem = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth(); 

  const taskToEdit = location.state?.task;

  // State
  const [taskTitle, setTaskTitle] = useState(taskToEdit?.taskTitle || "");
  const [taskDescription, setTaskDescription] = useState(taskToEdit?.taskDescription || "");
  const [assignedTo, setAssignedTo] = useState(taskToEdit?.assignedTo || "");
  const [status, setStatus] = useState(taskToEdit?.status || "Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (taskToEdit) {
        const payload = role === "junior" 
          ? { status } 
          : { taskTitle, taskDescription, assignedTo, status };

        await api.put(`/items/update/${id}`, payload);
      } else {
        await api.post("/items/add", { taskTitle, taskDescription, assignedTo, status });
      }

      navigate("/list");
    } catch (err) {
      console.error(err);
      alert("Failed to save task");
    }
  };

  return (
    <div className="container mt-5" style={{width:"500px"}}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">{taskToEdit ? "Edit Task" : "Add Task"}</h2>

         <form onSubmit={handleSubmit}>
  {role === "senior" && (
    <>
      <div className="mb-3">
        <label className="form-label">Task Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Task Description</label>
        <textarea
          className="form-control"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Assigned To</label>
        <input
          type="text"
          className="form-control"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
      </div>
    </>
  )}

  <div className="mb-3">
    <label className="form-label">Status</label>
    <select
      className="form-select"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="Pending">Pending</option>
      <option value="Done">Done</option>
    </select>
  </div>

  {/* Buttons side by side, centered */}
  <div className="d-flex justify-content-center gap-2 mt-4">
    <button type="submit" className="btn btn-primary" style={{ width: "150px" }}>
      {taskToEdit ? "Update Task" : "Add Task"}
    </button>
    <Link to="/list" className="btn btn-secondary" style={{ width: "150px" }}>
      Back to Tasklist
    </Link>
  </div>
</form>

        </div>
      </div>
    </div>
  );
};

export default CreateItem;
