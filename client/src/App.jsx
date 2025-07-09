
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import About from "./About";
import ImageUploadTest from "./components/ImageUpload";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<ImageUploadTest />} />
      </Routes>
    </Router>
  );
}

export default App;
