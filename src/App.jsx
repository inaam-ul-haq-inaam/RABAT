import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SplashScreen from './components/SplashScreen.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MobileBottomNav from './components/MobileBottomNav.jsx';
import MobileActionBar from './components/MobileActionBar.jsx';
import FloatingReviewBadge from './components/FloatingReviewBadge.jsx';
import AssistancePopup from './components/AssistancePopup.jsx';
import useReveal from './hooks/useReveal.js';
import useScrollFx from './hooks/useScrollFx.js';
import { pendingScroll, scrollToId, scrollToSelector } from './lib/navigation.js';
import HomePage from './pages/HomePage.jsx';
import HallPlanPage from './pages/HallPlanPage.jsx';
import DecorsPage from './pages/DecorsPage.jsx';
import CateringPage from './pages/CateringPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ReservePage from './pages/ReservePage.jsx';

const PAGE_TITLES = {
  '/': 'Rabat Hall — Top Banquet Hall In Lahore | Moroccan Luxury Venue',
  '/menu': 'Royal Banquet Menus & Catering Packages — Rabat Hall',
  '/services': 'Other Event Services & Enhancements — Rabat Hall',
  '/other-services': 'Other Event Services & Enhancements — Rabat Hall',
  '/catering': 'Top Catering & Royal Wedding Feasts — Rabat Hall Lahore',
  '/decors': 'Signature Stages & Décor — Rabat Hall',
  '/gallery': 'Photo Gallery & 3D Tour — Rabat Hall',
  '/hallplan': 'Hall Blueprint & Capacity — Rabat Hall',
  '/reserve': 'Reserve Your Event Date — Rabat Hall',
};

export default function App() {
  const location = useLocation();

  // Update browser tab title dynamically per page
  useEffect(() => {
    document.title =
      PAGE_TITLES[location.pathname] || 'Rabat Banquet Hall — Moroccan Luxury Venue | Lahore';
  }, [location.pathname]);

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
      <SplashScreen />

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/hallplan" element={<HallPlanPage />} />
          <Route path="/decors" element={<DecorsPage />} />
          <Route path="/catering" element={<CateringPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/other-services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <FloatingReviewBadge />
      <AssistancePopup />
      <MobileBottomNav />
      <MobileActionBar />
      <Footer />
    </>
  );
}
