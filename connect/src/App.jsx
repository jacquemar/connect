import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Demande from "./pages/Demande";
import Accueil from "./pages/Accueil";
import Admin from "./pages/Admin";
import Page404 from "./pages/Page404";
import ResetPassword from "./pages/ResetPassword";
import TableauDeBord from "./pages/TableauDeBord";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Accueil" element={<Accueil />} />
        <Route path="/profile/:userName" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/demande" element={<Demande />} />   
        <Route path="/recuperer-mot-de-passe" element={<ResetPassword />} />
        <Route path="/tableau-de-bord/edit" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
        <Route path="/tableau-de-bord" element={<ProtectedRoute><TableauDeBord /></ProtectedRoute>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
