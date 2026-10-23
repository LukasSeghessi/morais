import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminUpdate from "./pages/AdminUpdate";
import AdminRoute from "./routes/AdminRoutes";
import AdminSolar from "./pages/AdminSolar";

function AppContent() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname.startsWith("/login");

  useEffect(() => {
    if (!location.hash) return undefined;

    const targetId = decodeURIComponent(location.hash.slice(1));
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return (
    <>
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

        <Route
          path="/admin/usuarios"
          element={
            <AdminRoute>
              <AdminUpdate />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/analise-solar"
  element={
    <AdminRoute>
      <AdminSolar />
    </AdminRoute>
  }
/>

        <Route
          path="*"
          element={
            <main className="project-detail project-detail--not-found">
              <h1>Página não encontrada</h1>
              <Link to="/" className="project-detail__back-link">
                Voltar ao início
              </Link>
            </main>
          }
        />
      </Routes>

      {!isAdminPage && !isLoginPage && <Footer />}

      {!isAdminPage && !isLoginPage && <FloatingButtons />}

    </>
  );
}

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
      <AppContent />
    </BrowserRouter>
  );
}

export default App;