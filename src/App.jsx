import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./auth/Login";
import ItemList from "./components/ItemList";
import CreateItem from "./components/CreateItem";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
  <BrowserRouter>
  <AuthProvider>
    <Routes>
   
      <Route path="/" element={<Login />} />

      
      <Route
        path="/list"
        element={
          <ProtectedRoute>
            <ItemList />
          </ProtectedRoute>
        }
      />

   
      <Route
        path="/add"
        element={
          <ProtectedRoute allowedRoles={["senior"]}>
            <CreateItem />
          </ProtectedRoute>
        }
      />

     
      <Route
        path="/update/:id"
        element={
          <ProtectedRoute allowedRoles={["senior", "junior"]}>
            <CreateItem />
          </ProtectedRoute>
        }
      />
    </Routes>
  </AuthProvider>
</BrowserRouter>

  );
}

export default App;
