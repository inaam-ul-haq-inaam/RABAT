import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MENU_CATEGORIES,
  MENU_PACKAGES,
  MENU_DESSERTS,
  MENU_CUSTOM_SELECTION,
  MENU_ADD_ONS,
  MENU_SALADS,
  MENU_CHARCOAL,
  MENU_SEAFOODS,
  MENU_CONTINENTAL,
  CUSTOM_BUILDER_SECTIONS,
} from '../data/menu.js';
import { WhatsAppIcon } from './Icons.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';
import './MenuCatalog.css';

const WA_NUMBER = '923017130942';

// Ambient Backdrop Images (Curated Royal Banquet, Dining, Charcoal Grill & Florals)
const BASE = import.meta.env.BASE_URL || './';
const cleanBase = BASE.endsWith('/') ? BASE : `${BASE}/`;

const AMBIENT_BG_IMAGES = [
  { url: `${cleanBase}images/hero/rabat_hero_dining_hall.jpg`, alt: 'Palace Dining Setup' },
  { url: `${cleanBase}images/gallery/crystal_chandelier.jpeg`, alt: 'Imperial Chandelier & Amber Glow' },
  { url: `${cleanBase}images/catering/rabat_royal_feast_1790443145085.webp`, alt: 'Royal Banquet Feast' },
  { url: `${cleanBase}images/pavilion/rabat_hall_buffet_dining.jpg`, alt: 'Imperial Buffet Spread' },
  { url: `${cleanBase}images/decors/rabat_floral_stage_1790443124026.webp`, alt: 'Royal Floral Drapery' },
  { url: `${cleanBase}images/gallery/rabat-biryani.webp`, alt: 'Traditional Saffron & Charcoal Grill' },
];

export default function MenuCatalog() {
  const [activeSection, setActiveSection] = useState('packages');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();
  const { openContactModal } = useContactModal();

  // Ambient Blurred Background Slideshow State (changes every 7.5s with ultra-smooth 2.8s fade)
  const [ambientBgIndex, setAmbientBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAmbientBgIndex((prev) => (prev + 1) % AMBIENT_BG_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Custom Menu Builder Interactive State
  const [selectedCustomItems, setSelectedCustomItems] = useState([]);
  const [builderActiveFilter, setBuilderActiveFilter] = useState('all');
  const [builderSearchQuery, setBuilderSearchQuery] = useState('');
  // Accordion state: by default ALL collapsed so only clean category headings are visible
  const [expandedCategories, setExpandedCategories] = useState({});
  const [allExpandedManually, setAllExpandedManually] = useState(false);
  const hoverTimeoutRef = useRef(null);

  // Hover to expand category
  const handleCategoryMouseEnter = (catId) => {
    if (builderSearchQuery.trim() !== '' || allExpandedManually) {
      setExpandedCategories((prev) => ({ ...prev, [catId]: true }));
      return;
    }
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setExpandedCategories({ [catId]: true });
    }, 60);
  };

  // Collapse back when mouse leaves category ("hover kr k hatu to waps bnd ho jana chahiya")
  const handleCategoryMouseLeave = (catId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (builderSearchQuery.trim() !== '' || allExpandedManually) return;
    setExpandedCategories((prev) => {
      const next = { ...prev };
      delete next[catId];
      return next;
    });
  };

  const toggleCategoryAccordion = (catId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setAllExpandedManually(false);
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleExpandAllCategories = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setAllExpandedManually(true);
    const allOpen = {};
    CUSTOM_BUILDER_SECTIONS.forEach((s) => {
      allOpen[s.id] = true;
    });
    setExpandedCategories(allOpen);
  };

  const handleCollapseAllCategories = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setAllExpandedManually(false);
    setExpandedCategories({});
  };

  const handleSelectFilterPill = (filterId) => {
    setBuilderActiveFilter(filterId);
    if (filterId !== 'all') {
      setExpandedCategories((prev) => ({
        ...prev,
        [filterId]: true,
      }));
    }
  };

  // Scrollspy via IntersectionObserver for automatic sticky sidebar active item highlighting
  useEffect(() => {
    const sectionIds = MENU_CATEGORIES.map((c) => c.id);
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-100px 0px -55% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to hash if provided (e.g., /menu#desserts or /menu#m3)
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '').toLowerCase();
      // If hash matches a package (m1 - m7)
      const foundPkg = MENU_PACKAGES.find((p) => p.id === hash);
      if (foundPkg) {
        setActiveSection('packages');
        const el = document.getElementById(foundPkg.id) || document.getElementById('packages');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // If hash matches a category
      const foundCat = MENU_CATEGORIES.find((c) => c.id === hash);
      if (foundCat) {
        setActiveSection(foundCat.id);
        const el = document.getElementById(foundCat.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

    const handleInquirePackage = () => {
    openContactModal();
  };

  const handleInquireItem = () => {
    openContactModal();
  };

  // Custom Menu Builder Item Toggle
  const toggleCustomItem = (item, categoryName) => {
    setSelectedCustomItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, { ...item, category: categoryName }];
      }
    });
  };

  const isItemSelected = (itemId) => {
    return selectedCustomItems.some((i) => i.id === itemId);
  };

  const removeCustomItem = (itemId) => {
    setSelectedCustomItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearAllCustomItems = () => {
    setSelectedCustomItems([]);
  };

  // Send Custom Curated Menu to WhatsApp
  const handleSendCustomMenuWA = () => {
    if (selectedCustomItems.length === 0) return;

    // Group selected dishes by category
    const grouped = {};
    selectedCustomItems.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item.name);
    });

    let message = `*Custom Banquet Menu Inquiry — Rabat Banquet Hall*\n\n`;
    message += `Assalam-o-Alaikum! I have selected *${selectedCustomItems.length} custom dishes* for our upcoming event catering menu:\n\n`;

    Object.entries(grouped).forEach(([cat, dishes]) => {
      message += `*${cat}:*\n`;
      dishes.forEach((d) => {
        message += `  • ${d}\n`;
      });
      message += `\n`;
    });

    message += `Kindly share catering availability, menu per-head package quotation, and tasting details. Thank you!`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCustomInquiry = () => {
    openContactModal();
  };

  const scrollToCategory = (catId) => {
    setActiveSection(catId);
    const element = document.getElementById(catId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="menu-page-wrap">
      {/* ── AMBIENT BLURRED BACKDROP SLIDESHOW ── */}
      <div className="menu-ambient-backdrop" aria-hidden="true">
        <div className="menu-ambient-base" />
        {AMBIENT_BG_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`menu-ambient-slide ${ambientBgIndex === idx ? 'is-active' : ''}`}
            style={{ backgroundImage: `url('${img.url}')` }}
          />
        ))}
        <div className="menu-ambient-overlay" />
        <div className="menu-ambient-glow" />
      </div>
      {/* ── 1. HERO BANNER ── */}
      <section className="menu-hero">
        <div className="container">
          <span className="menu-hero-badge">
            <span className="menu-badge-dot" />
            Time &amp; Taste Catering &bull; Hall 16 Banquet Standard
          </span>
          <h1 className="menu-hero-title">Royal Banquet Menus</h1>

          <div className="menu-hero-actions">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="menu-btn-glass mobile-only-btn"
            >
              📋 All Categories
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. TWO-COLUMN SPLIT LAYOUT (Sticky Luxury Sidebar + Content Stream) ── */}
      <div className="menu-catalog-container">
        <div className="menu-split-layout">
          {/* ── LEFT COLUMN: STICKY LUXURY DIRECTORY SIDEBAR (Desktop) ── */}
          <aside className="menu-royal-sidebar" aria-label="Menu Sections Directory">
            <div className="sidebar-sticky-inner">
              <div className="sidebar-brand-box">
                <span className="sidebar-badge-top">ROYAL CATERING DIRECTORY</span>
                <h3 className="sidebar-title">Menu Sections</h3>
              </div>

              <nav className="sidebar-nav-list" role="navigation">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`sidebar-nav-item ${activeSection === cat.id ? 'active' : ''}`}
                    onClick={() => scrollToCategory(cat.id)}
                  >
                    <span className="sidebar-nav-num">{cat.num}</span>
                    <span className="sidebar-nav-icon">{cat.icon}</span>
                    <div className="sidebar-nav-details">
                      <span className="sidebar-nav-label">{cat.short}</span>
                      <span className="sidebar-nav-count">{cat.count}</span>
                    </div>
                    {activeSection === cat.id && <span className="sidebar-active-glow" />}
                  </button>
                ))}
              </nav>

              {/* Sidebar Team Assistance Card */}
              <div className="sidebar-chef-card">
                <div className="chef-card-header">
                  <span className="chef-card-icon">🏛️</span>
                  <h4>Need Assistance?</h4>
                </div>
                <p>Have specific dishes in mind or questions? Connect directly with our team.</p>
                <button
                  type="button"
                  className="btn-sidebar-wa"
                  onClick={openContactModal}
                >
                  <WhatsAppIcon size={14} />
                  <span>Consult With Our Team</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN: ALL MENU SEGMENTS STREAM ── */}
          <main className="menu-content-stream">
            {/* ════════════ SECTION 01: ONE DISH MENUS (M1 - M7) ════════════ */}
            <section id="packages" className="menu-section menu-section--packages">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 01</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BANQUET BROCHURE</span>
                <h2 className="menu-sec-title">ONE DISH MENU (Menu 1 &mdash; Menu 7)</h2>
                <p className="menu-sec-sub">
                  Official banquet menu packages compliant with government One Dish regulations,
                  served with premium mutton, chicken specialties, fresh tandoor naan, fresh salad, raita, dessert, and drinks.
                </p>
              </div>

              {/* All 7 Menus Grid View (Official Brochure Cards) */}
              <div className="all-packages-brochure-grid">
                {MENU_PACKAGES.map((pkg) => (
                  <article className="brochure-pkg-card" key={pkg.id} id={pkg.id}>
                    <header className="brochure-card-header">
                      <div className="brochure-ornament-row">
                        <span className="brochure-ornament-line" />
                        <span className="brochure-one-dish-tag">ONE DISH MENU</span>
                        <span className="brochure-ornament-line" />
                      </div>
                      <h3 className="brochure-pkg-code">{pkg.code}</h3>
                      <span className="brochure-pkg-suitable">{pkg.suitableFor}</span>
                    </header>

                    <ul className="brochure-items-list">
                      {pkg.courses.map((c, i) => (
                        <li key={i} className={`brochure-item ${c.hasChoice ? 'has-choice' : ''}`}>
                          <span className="brochure-item-bullet">•</span>
                          <div className="brochure-item-text">
                            {c.hasChoice ? (
                              <span className="brochure-choice-line">
                                {c.options.map((opt, oIdx) => (
                                  <span key={oIdx} className="choice-span">
                                    <strong>{opt}</strong>
                                    {oIdx < c.options.length - 1 && (
                                      <span className="brochure-or-badge">OR</span>
                                    )}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              <span>{c.options[0]}</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <footer className="brochure-card-footer">
                      <button
                        type="button"
                        className="btn-brochure-inquire"
                        onClick={openContactModal}
                        aria-label={`Inquire ${pkg.code}`}
                      >
                        <WhatsAppIcon size={16} />
                        <span>Inquire {pkg.code}</span>
                      </button>
                    </footer>
                  </article>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 02: DESSERTS (10 OFFICIAL DESSERTS) ════════════ */}
            <section id="desserts" className="menu-section menu-section--desserts">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 02</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BROCHURE SELECTION</span>
                <h2 className="menu-sec-title">Ten Royal Desserts (10 Signature Choices)</h2>
                <p className="menu-sec-sub">
                  Every One Dish Menu (Menu 1 to Menu 7) includes your choice of <strong>One Dessert</strong> from the 10 official royal desserts below, crafted fresh by Time &amp; Taste master chefs and halwais.
                </p>
              </div>

              <div className="desserts-official-grid">
                {MENU_DESSERTS.map((d) => (
                  <div className="dessert-royal-card" key={d.id}>
                    <div className="dessert-card-top">
                      <div className="dessert-badge-group">
                        <span className="dessert-num-badge">#{d.id}</span>
                        <span className="dessert-icon">{d.icon}</span>
                      </div>
                      <span className="dessert-tag-pill">{d.tag}</span>
                    </div>
                    <h3 className="dessert-title">{d.name}</h3>
                    <p className="dessert-desc">{d.desc}</p>
                    <div className="dessert-footer">
                      <span className="dessert-avail-pill">Included with Menus 1-7</span>
                      <button
                        type="button"
                        className="dessert-inquire-link"
                        onClick={openContactModal}
                        title="Inquire about this dessert"
                      >
                        <WhatsAppIcon size={14} />
                        <span>Inquire</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dessert-banner-note">
                <div className="dessert-banner-content">
                  <h4>Want a multi-dessert sweet buffet or live jalebi counter?</h4>
                  <p>
                    You can add multiple desserts or live dessert stations (Jalebi with Rabri, Belgian Chocolate Fountain, Kashmiri Chai) to your banquet package.
                  </p>
                </div>
                <button
                  type="button"
                  className="dessert-banner-btn"
                  onClick={() => scrollToCategory('addons')}
                >
                  Explore Sweet Live Stations &darr;
                </button>
              </div>
            </section>

            {/* ════════════ SECTION 03: CUSTOM SELECTION ════════════ */}
            <section id="custom-selection" className="menu-section menu-section--custom">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 03</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BROCHURE SELECTION</span>
                <h2 className="menu-sec-title">Custom Selection (Signature Specialties)</h2>
                <p className="menu-sec-sub">
                  Exclusive a la carte royal specialties from Time &amp; Taste Catering, available for custom menu curation, main course replacements, and VIP dinner upgrades.
                </p>
              </div>

              <div className="item-cards-grid">
                {MENU_CUSTOM_SELECTION.map((item, idx) => (
                  <div className="item-card" key={idx}>
                    <div className="item-card-head">
                      <div className="item-title-cluster">
                        <span className="item-icon-small">{item.icon}</span>
                        <h3 className="item-name">{item.name}</h3>
                      </div>
                      <span className="item-tag">{item.tag}</span>
                    </div>
                    <p className="item-desc">{item.desc}</p>
                    <div className="item-card-action">
                      <button
                        type="button"
                        className="btn-item-wa"
                        onClick={openContactModal}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Inquire Dish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 04: ADD-ON'S & LIVE STATIONS ════════════ */}
            <section id="addons" className="menu-section menu-section--addons">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 04</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BROCHURE ADD-ON'S</span>
                <h2 className="menu-sec-title">Add-On's &amp; Live Stations</h2>
                <p className="menu-sec-sub">
                  Upgrade your celebration with artisanal hot soups, live stuffed naans, antique tea samovars, live coffee stations, and refreshing mocktails.
                </p>
              </div>

              <div className="item-cards-grid">
                {MENU_ADD_ONS.map((item, idx) => (
                  <div className="item-card" key={idx}>
                    <div className="item-card-head">
                      <div className="item-title-cluster">
                        <span className="item-icon-small">{item.icon}</span>
                        <h3 className="item-name">{item.name}</h3>
                      </div>
                      <span className="item-tag">{item.tag}</span>
                    </div>
                    <p className="item-desc">{item.desc}</p>
                    <div className="item-card-action">
                      <button
                        type="button"
                        className="btn-item-wa"
                        onClick={openContactModal}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Inquire Add-On</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 05: ROYAL SALADS ════════════ */}
            <section id="salads" className="menu-section menu-section--salads">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 05</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BROCHURE SALADS</span>
                <h2 className="menu-sec-title">Royal Salads (Salad Bar Selection)</h2>
                <p className="menu-sec-sub">
                  Every One Dish Menu includes your choice of <strong>One Fresh Salad</strong>. Explore our 7 official salad varieties prepared fresh for your event.
                </p>
              </div>

              <div className="item-cards-grid">
                {MENU_SALADS.map((s, idx) => (
                  <div className="item-card" key={idx}>
                    <div className="item-card-head">
                      <div className="item-title-cluster">
                        <span className="item-icon-small">{s.icon}</span>
                        <h3 className="item-name">{s.name}</h3>
                      </div>
                      <span className="item-tag">{s.tag}</span>
                    </div>
                    <p className="item-desc">{s.desc}</p>
                    <div className="item-card-action">
                      <button
                        type="button"
                        className="btn-item-wa"
                        onClick={openContactModal}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Inquire Salad</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 06: CHARCOAL BBQ & ROASTS ════════════ */}
            <section id="charcoal" className="menu-section menu-section--charcoal">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 06</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BROCHURE CHARCOAL</span>
                <h2 className="menu-sec-title">Live Charcoal BBQ &amp; Royal Roasts</h2>
                <p className="menu-sec-sub">
                  Flame-kissed over burning wood coals: authentic mutton chops, succulent malai boti, steam roasts, and Pashtun-style mutton dampukht.
                </p>
              </div>

              <div className="item-cards-grid">
                {MENU_CHARCOAL.map((c, idx) => (
                  <div className="item-card" key={idx}>
                    <div className="item-card-head">
                      <div className="item-title-cluster">
                        <span className="item-icon-small">{c.icon}</span>
                        <h3 className="item-name">{c.name}</h3>
                      </div>
                      <span className="item-tag">{c.tag}</span>
                    </div>
                    <p className="item-desc">{c.desc}</p>
                    <div className="item-card-action">
                      <button
                        type="button"
                        className="btn-item-wa"
                        onClick={openContactModal}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Inquire Live BBQ</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 07: FRESH SEA FOOD ════════════ */}
            <section id="seafoods" className="menu-section menu-section--seafoods">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 07</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BROCHURE SEA FOOD</span>
                <h2 className="menu-sec-title">Fresh Sea Food Delicacies</h2>
                <p className="menu-sec-sub">
                  Crisp Lahori masala fish, golden panko crumb fillets, tandoori fish tikka, and crispy giant tempura tiger prawns.
                </p>
              </div>

              <div className="item-cards-grid">
                {MENU_SEAFOODS.map((sf, idx) => (
                  <div className="item-card" key={idx}>
                    <div className="item-card-head">
                      <div className="item-title-cluster">
                        <span className="item-icon-small">{sf.icon}</span>
                        <h3 className="item-name">{sf.name}</h3>
                      </div>
                      <span className="item-tag">{sf.tag}</span>
                    </div>
                    <p className="item-desc">{sf.desc}</p>
                    <div className="item-card-action">
                      <button
                        type="button"
                        className="btn-item-wa"
                        onClick={openContactModal}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Inquire Sea Food</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 08: CONTINENTAL & CHINESE ════════════ */}
            <section id="continental" className="menu-section menu-section--continental">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 08</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BROCHURE CONTINENTAL</span>
                <h2 className="menu-sec-title">Continental &amp; Chinese Specialties</h2>
                <p className="menu-sec-sub">
                  Char-grilled black pepper steaks, oriental egg fried rice, chicken cashew nuts, sweet &amp; sour wok, and lemon butter fish.
                </p>
              </div>

              <div className="item-cards-grid">
                {MENU_CONTINENTAL.map((cont, idx) => (
                  <div className="item-card" key={idx}>
                    <div className="item-card-head">
                      <div className="item-title-cluster">
                        <span className="item-icon-small">{cont.icon}</span>
                        <h3 className="item-name">{cont.name}</h3>
                      </div>
                      <span className="item-tag">{cont.tag}</span>
                    </div>
                    <p className="item-desc">{cont.desc}</p>
                    <div className="item-card-action">
                      <button
                        type="button"
                        className="btn-item-wa"
                        onClick={openContactModal}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Inquire Dish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 09: INTERACTIVE CUSTOM MENU BUILDER ════════════ */}
            <section id="custom" className="menu-section menu-section--custom-builder">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 09 &bull; INTERACTIVE BUILDER</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">BESPOKE CATERING STUDIO</span>
                <h2 className="menu-sec-title">Build Your Custom Menu</h2>
                <p className="menu-sec-sub">
                  Pick multiple items across our complete royal culinary catalog. Click any dish to select or deselect,
                  and send your personalized menu directly to our team via WhatsApp for instant quotation.
                </p>
              </div>

              <div className="custom-builder-container">
                {/* Builder Controls: Search + Category Filters */}
                <div className="builder-toolbar">
                  <div className="builder-search-box">
                    <span className="builder-search-icon">🔍</span>
                    <input
                      type="text"
                      className="builder-search-input"
                      placeholder="Search dishes (e.g. Mutton, Biryani, Fish, Kheer)..."
                      value={builderSearchQuery}
                      onChange={(e) => setBuilderSearchQuery(e.target.value)}
                    />
                    {builderSearchQuery && (
                      <button
                        type="button"
                        className="builder-search-clear"
                        onClick={() => setBuilderSearchQuery('')}
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  <div className="builder-cat-pills" role="tablist">
                    <button
                      type="button"
                      className={`builder-pill ${builderActiveFilter === 'all' ? 'active' : ''}`}
                      onClick={() => handleSelectFilterPill('all')}
                    >
                      <span>All Dishes</span>
                      <span className="builder-pill-count">
                        {CUSTOM_BUILDER_SECTIONS.reduce((acc, s) => acc + s.items.length, 0)}
                      </span>
                    </button>
                    {CUSTOM_BUILDER_SECTIONS.map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        className={`builder-pill ${builderActiveFilter === sec.id ? 'active' : ''}`}
                        onClick={() => handleSelectFilterPill(sec.id)}
                      >
                        <span>{sec.icon} {sec.category.split(' ')[0]}</span>
                        <span className="builder-pill-count">{sec.items.length}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Accordion Controls & Category Collapse Bar */}
                <div className="builder-quick-controls">
                  <span className="builder-collapse-hint">
                    💡 <em>Hover or click any category heading to view dishes &amp; select</em>
                  </span>
                  <div className="builder-expand-buttons">
                    <button
                      type="button"
                      className="btn-expand-all"
                      onClick={handleExpandAllCategories}
                      title="Open all category accordions"
                    >
                      ▾ Expand All
                    </button>
                    <button
                      type="button"
                      className="btn-collapse-all"
                      onClick={handleCollapseAllCategories}
                      title="Collapse all category accordions"
                    >
                      ▴ Collapse All
                    </button>
                  </div>
                </div>

                {/* Dishes Multi-Select Accordion List Grouped by Category */}
                <div className="builder-sections-list">
                  {CUSTOM_BUILDER_SECTIONS.filter((sec) =>
                    builderActiveFilter === 'all' ? true : sec.id === builderActiveFilter
                  ).map((sec) => {
                    const filteredItems = sec.items.filter((item) =>
                      builderSearchQuery
                        ? item.name.toLowerCase().includes(builderSearchQuery.toLowerCase()) ||
                          item.tag.toLowerCase().includes(builderSearchQuery.toLowerCase())
                        : true
                    );

                    if (filteredItems.length === 0) return null;

                    // Automatically expand if user is searching so matching dishes appear
                    const isExpanded = builderSearchQuery.trim() !== '' ? true : !!expandedCategories[sec.id];
                    const selectedCount = selectedCustomItems.filter((i) => i.category === sec.category).length;

                    return (
                      <div
                        key={sec.id}
                        className={`builder-group-box ${isExpanded ? 'is-open' : 'is-collapsed'}`}
                        onMouseEnter={() => handleCategoryMouseEnter(sec.id)}
                        onMouseLeave={() => handleCategoryMouseLeave(sec.id)}
                      >
                        {/* Interactive Accordion Header Bar */}
                        <div
                          className={`builder-accordion-header ${isExpanded ? 'is-open' : ''}`}
                          onClick={() => toggleCategoryAccordion(sec.id)}
                          role="button"
                          tabIndex={0}
                          aria-expanded={isExpanded}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              toggleCategoryAccordion(sec.id);
                            }
                          }}
                        >
                          <div className="builder-accordion-left">
                            <span className="builder-group-icon">{sec.icon}</span>
                            <div className="builder-accordion-titles">
                              <h3 className="builder-group-title">{sec.category}</h3>
                              <span className="builder-accordion-subtitle">
                                {filteredItems.length} Dishes Available
                              </span>
                            </div>
                          </div>

                          <div className="builder-accordion-right">
                            {selectedCount > 0 && (
                              <span className="builder-cat-selected-pill">
                                <span className="cat-selected-check">✓</span>
                                <span>{selectedCount} Selected</span>
                              </span>
                            )}
                            <span className="builder-group-count">{filteredItems.length} Dishes</span>
                            <span
                              className={`builder-accordion-chevron ${isExpanded ? 'is-rotated' : ''}`}
                              aria-hidden="true"
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </span>
                          </div>
                        </div>

                        {/* Collapsible Dishes Checkboxes Grid */}
                        {isExpanded && (
                          <div className="builder-accordion-body">
                            <div className="builder-items-grid">
                              {filteredItems.map((item) => {
                                const selected = isItemSelected(item.id);
                                return (
                                  <div
                                    key={item.id}
                                    className={`builder-item-card ${selected ? 'is-selected' : ''}`}
                                    onClick={() => toggleCustomItem(item, sec.category)}
                                    role="checkbox"
                                    aria-checked={selected}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === ' ' || e.key === 'Enter') {
                                        e.preventDefault();
                                        toggleCustomItem(item, sec.category);
                                      }
                                    }}
                                  >
                                    <div className="builder-card-checkbox">
                                      <span className="checkbox-ring">
                                        {selected && <span className="checkbox-check">✓</span>}
                                      </span>
                                    </div>
                                    <span className="builder-item-icon">{item.icon}</span>
                                    <div className="builder-item-info">
                                      <span className="builder-item-name">{item.name}</span>
                                      <span className="builder-item-tag">{item.tag}</span>
                                    </div>
                                    {selected && (
                                      <span className="builder-selected-badge">Selected</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Selection Summary Tray */}
                <div className={`builder-selection-tray ${selectedCustomItems.length > 0 ? 'has-items' : 'is-empty'}`}>
                  {selectedCustomItems.length > 0 ? (
                    <>
                      <div className="tray-top-bar">
                        <div className="tray-count-cluster">
                          <span className="tray-count-badge">{selectedCustomItems.length}</span>
                          <div className="tray-headings">
                            <h4 className="tray-title">Your Custom Menu Selection</h4>
                            <span className="tray-sub">
                              Review your selected items and submit directly to our event team
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn-tray-clear"
                          onClick={clearAllCustomItems}
                          title="Reset selection"
                        >
                          Clear All
                        </button>
                      </div>

                      <div className="tray-selected-chips">
                        {selectedCustomItems.map((item) => (
                          <span key={item.id} className="tray-chip">
                            <span className="tray-chip-icon">{item.icon}</span>
                            <span className="tray-chip-name">{item.name}</span>
                            <button
                              type="button"
                              className="tray-chip-remove"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeCustomItem(item.id);
                              }}
                              aria-label={`Remove ${item.name}`}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="tray-actions-row">
                        <button
                          type="button"
                          className="btn-tray-wa"
                          onClick={handleSendCustomMenuWA}
                        >
                          <WhatsAppIcon size={18} />
                          <span>Send Custom Menu On WhatsApp ({selectedCustomItems.length} Dishes)</span>
                        </button>
                        <button
                          type="button"
                          className="btn-tray-call"
                          onClick={openContactModal}
                        >
                          <span>Inquire via Call / Concierge</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="tray-empty-hint">
                      <span className="tray-hint-icon">👆</span>
                      <p className="tray-hint-text">
                        <strong>Tap or click any dishes above</strong> to start building your custom banquet menu. You can select multiple items across all categories!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Floating Selected Custom Items Bar (when items are selected) */}
      {selectedCustomItems.length > 0 && (
        <aside className="builder-floating-badge" aria-label="Selected custom menu summary">
          <div className="floating-badge-content" onClick={() => scrollToCategory('custom')}>
            <span className="floating-badge-count">{selectedCustomItems.length}</span>
            <span className="floating-badge-text">Dishes Selected</span>
          </div>
          <button
            type="button"
            className="floating-badge-wa-btn"
            onClick={handleSendCustomMenuWA}
            title="Send Custom Menu on WhatsApp"
          >
            <WhatsAppIcon size={15} />
            <span>Send to WhatsApp</span>
          </button>
        </aside>
      )}

      {/* ── 3. MOBILE FLOATING DIRECTORY BAR & BOTTOM DRAWER ── */}
      <div className="mobile-directory-floating-bar">
        <button
          type="button"
          className="mobile-directory-btn"
          onClick={() => setMobileDrawerOpen(true)}
          aria-label="Open Menu Sections Directory"
        >
          <span className="dir-btn-left">
            <span className="dir-btn-icon">🏛️</span>
            <span className="dir-btn-text">Browse Categories</span>
          </span>
          <span className="dir-btn-pill">
            <span className="dir-pill-name">
              {MENU_CATEGORIES.find((c) => c.id === activeSection)?.short || '9 Categories'}
            </span>
            <span className="dir-btn-arrow" aria-hidden="true">▲</span>
          </span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="mobile-drawer-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu Categories Directory"
          >
            <div className="drawer-handle-bar" />
            <div className="drawer-top-row">
              <div>
                <span className="drawer-kicker">TIME &amp; TASTE CATERING</span>
                <h3 className="drawer-heading">Menu Directory</h3>
              </div>
              <button
                type="button"
                className="drawer-x-btn"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close directory"
              >
                ✕
              </button>
            </div>

            <div className="drawer-category-list">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`drawer-cat-row ${activeSection === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    scrollToCategory(cat.id);
                  }}
                >
                  <span className="drawer-row-num">{cat.num}</span>
                  <span className="drawer-row-icon">{cat.icon}</span>
                  <div className="drawer-row-info">
                    <span className="drawer-row-title">{cat.label}</span>
                    <span className="drawer-row-meta">{cat.tag} &bull; {cat.count}</span>
                  </div>
                  <span className="drawer-row-arrow">&rarr;</span>
                </button>
              ))}
            </div>

            <div className="drawer-team-box">
              <button
                type="button"
                className="btn-drawer-team-wa"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  openContactModal();
                }}
              >
                <WhatsAppIcon size={16} />
                <span>Consult With Our Team</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
