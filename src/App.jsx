import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminRoute from "./routes/AdminRoutes";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/projetos/:id" element={<ProjectDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
  }
/>
      </Routes>

      <Footer />
      <FloatingButtons />
    </BrowserRouter>
  );
}

export default App;