import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      setError("Please select role");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password, role });
      login(res.data.token, res.data.role);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
  
 <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
  <h1 className="mb-4 text-center" style={{fontSize:"32px"}}>Disenosys User Role Management Task</h1>

  <form 
    onSubmit={handleSubmit} 
    className="p-4 bg-white shadow rounded" 
    style={{ minWidth: "350px" }}
  >
    <h2 className="text-center mb-4">Login</h2>

    {error && <div className="alert alert-danger">{error}</div>}

    <div className="mb-3">
      <select
        className="form-select"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="senior">Senior</option>
        <option value="junior">Junior</option>
      </select>
    </div>

    <div className="mb-3">
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div className="mb-3">
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <button type="submit" className="btn btn-primary w-100">Login</button>
  </form>
</div>

    </>
  );
};

export default Login;
