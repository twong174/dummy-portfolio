import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import { useEffect } from "react";

import Lenis from "@studio-freight/lenis";
import ProjectPage from "./pages/projects/ProjectPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
