import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import Layout from "./component/Layout";
import Profile from "./component/Profile";
import EditProfilePage from "./pages/EditProfilePage";
import { ToastContainer } from "react-toastify";
import ViewSingleTask from "./component/ViewSingleTask";
import Users from "./component/Users";

const App = () => {
  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route index element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Route */}
        <Route path="/" element={<Layout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
          <Route path="/tasks/:taskId" element={<ProtectedRoute>
            <ViewSingleTask />
          </ProtectedRoute>} />
          <Route path="/allusers" element={<ProtectedRoute>
            <Users />
          </ProtectedRoute>} />
          <Route path="/editProfile" element={<ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;