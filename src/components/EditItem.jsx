import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const EditItem = ({ id }) => {
  const { role } = useAuth();

  // Only seniors or juniors can see this
  if (role !== "senior" && role !== "junior") return null;

  const editItem = async () => {
    try {
      await api.put(`/items/update/${id}`, { name: "Updated" });
      alert("Task updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  return (
    <button
      onClick={editItem}
      className={`btn btn-sm ${
        role === "senior" ? "btn-primary" : "btn-warning"
      }`}
    >
      Edit
    </button>
  );
};

export default EditItem;
