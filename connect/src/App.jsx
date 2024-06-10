import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Demande from "./pages/Demande";
import Inscription from "./pages/Inscription";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userName" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/demande" element={<Demande />} />
        <Route path="/dashboard/edit" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/Inscription" element={<Inscription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
