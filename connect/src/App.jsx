import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Demande from "./pages/Demande";
import Admin from "./pages/Admin";
import Page404 from "./pages/Page404";
import ResetPassword from "./pages/ResetPassword";
import TableauDeBord from "./pages/TableauDeBord";
import Cgu from "./components/ConditionsGenerale";
import Confidentialite from "./components/Confidentialite";
import Cookies from "./components/Cookies";
import Faq from "./components/Faq";
import Blog from "./components/Blog";
import MentionsLegales from "./components/MentionsLegales";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/profile/:userName" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/demande" element={<Demande />} />   
        <Route path="/conditions-generales" element={<Cgu />} />   
        <Route path="/confidentialites" element={<Confidentialite />} />   
        <Route path="/mentions-legales" element={<MentionsLegales />} />   
        <Route path="/cookies" element={<Cookies />} />   
        <Route path="/blog" element={<Blog />} />   
        <Route path="/faq" element={<Faq />} />   
        <Route path="/confidentialites" element={<Confidentialite />} />   
        <Route path="/recuperer-mot-de-passe" element={<ResetPassword />} />
        <Route path="/tableau-de-bord/edit" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
        <Route path="/tableau-de-bord" element={<ProtectedRoute><TableauDeBord /></ProtectedRoute>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
