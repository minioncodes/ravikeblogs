import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import About from "./About";
import AdminAuth from "./admin/AdminAuth";
import AdminDashboard from "./admin/AdminDashboard";

function AppWrapper() {
  const location = useLocation();

 
  const hideNavbarRoutes = ["/admin", "/admin/dashboard"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/upload" element={<ImageUploadTest />} /> */}
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
