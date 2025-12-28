import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items/list");
      setItems(res.data);
    } catch (err) {
      console.error("List fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (role !== "senior") {
      alert("Access denied");
      return;
    }

    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/items/delete/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = (task) => {
    navigate(`/update/${task._id}`, { state: { task } });
  };

  return (
    <div className="container mt-5">
    
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task List</h2>
        <div>
          {role === "senior" && (
            <Link to="/add" className="btn btn-success me-2">
              Add Task
            </Link>
          )}
          <Link to="/" className="btn btn-secondary">
            Logout
          </Link>
        </div>
      </div>

      {/* No tasks message */}
      {items.length === 0 && <p className="text-muted">No tasks found</p>}

      <div className="row">
        {items.map((task) => (
          <div key={task._id} className="col-md-6 mb-4">
            <div
              className={`card shadow-sm ${
                task.status === "Done" ? "border-success" : "border-warning"
              }`}
            >
              <div className="card-body">
                <h5 className="card-title"> Task Title:  {task.taskTitle}</h5>
                <p className="card-text">Description:  {task.taskDescription}</p>

                <p className="mb-1">
                  <b>Assigned To:  </b> {task.assignedTo}
                </p>
                <p className="mb-1">
                  <b>Created By:  </b> {task.createdBy}
                </p>
                <p className="mb-3">
                  <b>Created At:  </b>{" "}
                  {new Date(task.createdAt).toLocaleString()}
                </p>

                <p className="mb-3">
                  <b>Status:  </b>{" "}
                  <span
                    className={task.status === "Done" ? "text-success" : "text-warning"}
                  >
                    {task.status}
                  </span>
                </p>

              
                <div className="d-flex">
                  {(role === "senior" || role === "junior") && (
                    <button
                      className={`btn btn-sm me-2 ${
                        role === "senior" ? "btn-primary" : "btn-warning"
                      }`}
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                  )}
                  {role === "senior" && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
