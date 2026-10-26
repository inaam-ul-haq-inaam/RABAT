import { useState, useEffect } from 'react';
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
} from '../data/menu.js';
import { WhatsAppIcon } from './Icons.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';
import './MenuCatalog.css';

const WA_NUMBER = '923256572839';

export default function MenuCatalog() {
  const [activeSection, setActiveSection] = useState('packages');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();
  const { openContactModal } = useContactModal();

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

  const handleInquirePackage = (pkg) => {
    const summary = pkg.courses
      ? pkg.courses.map((c, i) => `${i + 1}. ${c.options.join(' OR ')}`).join('%0A')
      : pkg.tag;
    const text = `Hello Rabat Banquet Hall, I am inquiring about ONE DISH MENU: *${pkg.code}*%0A%0A*Menu Details:*%0A${summary}%0A%0APlease share pricing and availability for Hall 16.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  };

  const handleInquireItem = (itemName, category) => {
    const text = encodeURIComponent(
      `Hello Rabat Banquet Hall, I am inquiring about adding *${itemName}* from the *${category}* section to our event catering menu.`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  };

  const handleCustomInquiry = () => {
    const text = encodeURIComponent(
      `Hello Rabat Banquet Hall, I would like to design a bespoke *Custom Catering Menu* with your executive chef for our upcoming event.`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
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
              onClick={() => scrollToCategory('packages')}
              className="menu-btn-gold"
            >
              Explore One Dish Menus 1 - 7 &darr;
            </button>
            <button
              type="button"
              onClick={() => scrollToCategory('desserts')}
              className="menu-btn-glass"
            >
              🍨 10 Royal Desserts
            </button>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="menu-btn-glass mobile-only-btn"
            >
              📋 All 8 Categories
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. TWO-COLUMN SPLIT LAYOUT (Sticky Luxury Sidebar + Content Stream) ── */}
      <div className="container menu-catalog-container">
        <div className="menu-split-layout">
          {/* ── LEFT COLUMN: STICKY LUXURY DIRECTORY SIDEBAR (Desktop) ── */}
          <aside className="menu-royal-sidebar" aria-label="Menu Sections Directory">
            <div className="sidebar-sticky-inner">
              <div className="sidebar-brand-box">
                <span className="sidebar-badge-top">ROYAL CATERING DIRECTORY</span>
                <h3 className="sidebar-title">Menu Sections</h3>
                <p className="sidebar-subtitle">Time &amp; Taste &bull; Hall 16</p>
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

              {/* Sidebar Chef Assistance Card */}
              <div className="sidebar-chef-card">
                <div className="chef-card-header">
                  <span className="chef-card-icon">👨‍🍳</span>
                  <h4>Custom Menu?</h4>
                </div>
                <p>Have specific dishes in mind? Our executive chef will craft a bespoke feast for your guests.</p>
                <button
                  type="button"
                  className="btn-sidebar-wa"
                  onClick={handleCustomInquiry}
                >
                  <WhatsAppIcon size={14} />
                  <span>Consult Master Chef</span>
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
                  served with premium mutton, chicken specialties, fresh tandoor naan, gourmet salad, raita, dessert, and drinks.
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
                        onClick={() => handleInquirePackage(pkg)}
                      >
                        <WhatsAppIcon size={16} />
                        <span>Inquire {pkg.code} On WhatsApp</span>
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
                        onClick={() => handleInquireItem(d.name, 'Royal Desserts')}
                        title="Inquire about this dessert on WhatsApp"
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
                        onClick={() => handleInquireItem(item.name, 'Custom Selection')}
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
                        onClick={() => handleInquireItem(item.name, "Add-On's")}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Inquire Add-On</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 05: GOURMET SALADS ════════════ */}
            <section id="salads" className="menu-section menu-section--salads">
              <div className="menu-section-header">
                <div className="section-royal-crown">
                  <span className="sec-arch-line" />
                  <span className="sec-number-badge">SECTION 05</span>
                  <span className="sec-arch-line" />
                </div>
                <span className="menu-sec-tag">OFFICIAL BROCHURE SALADS</span>
                <h2 className="menu-sec-title">Gourmet Salads (Salad Bar Selection)</h2>
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
                        onClick={() => handleInquireItem(s.name, 'Salads')}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Select for Menu</span>
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
                        onClick={() => handleInquireItem(c.name, 'Charcoal BBQ')}
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
                        onClick={() => handleInquireItem(sf.name, 'Sea Food')}
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
                        onClick={() => handleInquireItem(cont.name, 'Continental')}
                      >
                        <WhatsAppIcon size={13} />
                        <span>Inquire Dish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════ SECTION 09: CUSTOM MENU CONSULTATION BANNER ════════════ */}
            <section id="custom" className="menu-section">
              <div className="custom-menu-banner">
                <div className="custom-banner-content">
                  <span className="custom-banner-tag">BESPOKE CATERING CONSULTATION</span>
                  <h2 className="custom-banner-title">Build Your Own Custom Menu</h2>
                  <p className="custom-banner-text">
                    Every celebration is unique. If you prefer to mix and match dishes across our packages or introduce
                    signature family recipes, our executive chef from Time &amp; Taste Catering will personally curate
                    a bespoke menu tailored precisely to your taste, guest count, and presentation style.
                  </p>
                  <div className="custom-banner-btns">
                    <button
                      type="button"
                      className="btn-custom-wa"
                      onClick={handleCustomInquiry}
                    >
                      <WhatsAppIcon size={18} />
                      <span>Consult Executive Chef On WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      className="btn-custom-call"
                      onClick={openContactModal}
                    >
                      Schedule A Tasting Session &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* ── 3. MOBILE FLOATING DIRECTORY BAR & BOTTOM DRAWER ── */}
      <div className="mobile-directory-floating-bar">
        <button
          type="button"
          className="mobile-directory-btn"
          onClick={() => setMobileDrawerOpen(true)}
          aria-label="Open Menu Sections Directory"
        >
          <span className="dir-btn-icon">🏛️</span>
          <span className="dir-btn-text">Browse Categories</span>
          <span className="dir-btn-pill">
            {MENU_CATEGORIES.find((c) => c.id === activeSection)?.short || 'Menu'}
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
          </div>
        </div>
      )}
    </div>
  );
}
