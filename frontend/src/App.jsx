import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import Doctors from './pages/Doctors';
import Facilities from './pages/Facilities';
import CTImaging from './pages/CTImaging';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import DepartmentDetail from './pages/DepartmentDetail';
import DoctorDetail from './pages/DoctorDetail';

// Components
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Initial loading screen display for 3.5 seconds
    const startTimer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500); // Wait for fade-out animation to complete
      return () => clearTimeout(removeTimer);
    }, 3500);

    return () => clearTimeout(startTimer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen fadeOut={fadeOut} />}
      
      <Router basename={import.meta.env.DEV ? '/' : '/maurya_hospital'}>
        <Routes>
          {/* Public Views nested in MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="departments" element={<Departments />} />
            <Route path="specialities/:slug" element={<DepartmentDetail />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:id" element={<DoctorDetail />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="ct-imaging" element={<CTImaging />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Views */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
