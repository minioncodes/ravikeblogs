import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import About from "./About";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on admin-related routes
  const hideNavbarRoutes = ["/admin", "/admin/dashboard"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
