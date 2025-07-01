import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./auth/register";
import Login from "./auth/login";
import "./App.css";
import ProtectedRoute from "./components/protectedRoutes";
import Dashboard from "./pages/dashboard";
import Unauthorized from "./pages/unAuthorized";
import CreateProject from "./pages/projects/createProject";
import ProjectsList from "./pages/projects/projectLists";
import EditProject from "./pages/projects/updateProject";
import GlobalLoader from "./components/globalLoader";
import { useEffect } from "react";
import { useLoader } from "./context/loaderContext";

function App() {
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    // Show loader briefly on every route change
    showLoader();

    // Simulate a small delay to make loading feel realistic
    const timer = setTimeout(() => {
      hideLoader();
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer); // Cleanup
  }, [location.pathname]);

  return (
    <>
      {" "}
      <GlobalLoader />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route for all roles */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <ProjectsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/create"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <CreateProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditProject />
            </ProtectedRoute>
          }
        />

        {/* Optional: Admin-only page */}
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <h1 className="text-2xl text-center mt-10">Admin Panel</h1>
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
