import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MobileActionBar from './components/MobileActionBar.jsx';
import MobileBottomNav from './components/MobileBottomNav.jsx';
import useReveal from './hooks/useReveal.js';
import useScrollFx from './hooks/useScrollFx.js';
import { pendingScroll, scrollToId, scrollToSelector } from './lib/navigation.js';
import HomePage from './pages/HomePage.jsx';
import HallPlanPage from './pages/HallPlanPage.jsx';
import DecorsPage from './pages/DecorsPage.jsx';
import CateringPage from './pages/CateringPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ReservePage from './pages/ReservePage.jsx';

export default function App() {
  const location = useLocation();

  // scroll-reveal + 94%-waypoint fade, re-initialised for every page swap
  useReveal(location.key);
  useScrollFx(location.key);

  // page switcher: the newly opened tab always starts at the top, except when the
  // click carried a deep link (#hallmarks) or an anchor target (.gallery-filters)
  useEffect(() => {
    const target = pendingScroll.target;
    pendingScroll.target = null;

    if (target) {
      window.requestAnimationFrame(() => scrollToId(target));
      return;
    }
    if (location.state && location.state.scrollTo) {
      const { scrollTo, scrollOffset } = location.state;
      window.requestAnimationFrame(() => scrollToSelector(scrollTo, scrollOffset || 80));
      return;
    }
    window.scrollTo(0, 0);
  }, [location.key]);

  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hallplan" element={<HallPlanPage />} />
          <Route path="/decors" element={<DecorsPage />} />
          <Route path="/catering" element={<CateringPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <MobileActionBar />
      <MobileBottomNav />
      <Footer />
    </>
  );
}
