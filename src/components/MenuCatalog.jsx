import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  MENU_CATEGORIES,
  MENU_PACKAGES,
  MENU_ADD_ONS,
  MENU_DESSERTS,
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
  const [activePackageId, setActivePackageId] = useState('m1');
  const [activeCategory, setActiveCategory] = useState('packages');
  const [packageViewMode, setPackageViewMode] = useState('featured'); // 'featured' | 'all'
  const location = useLocation();
  const { openContactModal } = useContactModal();

  // Scroll to hash if provided (e.g., /menu#desserts or /menu#m3)
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '').toLowerCase();
      // If hash matches a package (m1 - m7)
      const foundPkg = MENU_PACKAGES.find((p) => p.id === hash);
      if (foundPkg) {
        setActivePackageId(foundPkg.id);
        setActiveCategory('packages');
        setPackageViewMode('featured');
        const el = document.getElementById('packages');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // If hash matches a category
      const foundCat = MENU_CATEGORIES.find((c) => c.id === hash);
      if (foundCat) {
        setActiveCategory(foundCat.id);
        const el = document.getElementById(foundCat.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  const activePackage = MENU_PACKAGES.find((p) => p.id === activePackageId) || MENU_PACKAGES[0];

  const handleInquirePackage = (pkg) => {
    const summary = pkg.courses
      ? pkg.courses.map((c, i) => `${i + 1}. ${c.options.join(' OR ')}`).join('%0A')
      : pkg.tag;
    const text = `Hello Rabat Banquet Hall, I am inquiring about ONE DISH MENU: *${pkg.code}*%0A%0A*Menu Details:*%0A${summary}%0A%0APlease share pricing and availability for Hall 16.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  };

  const handleInquireDessert = (dessert) => {
    const text = encodeURIComponent(
      `Hello Rabat Banquet Hall, I am inquiring about including royal dessert: *${dessert.name} (${dessert.tag})* for my event catering.`
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
    setActiveCategory(catId);
    const element = document.getElementById(catId);
    if (element) {
      const offset = 100;
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
          <p className="menu-hero-lead">
            Official <strong>One Dish Menus (Menu 1 to Menu 7)</strong> and <strong>10 Signature Royal Desserts</strong>,
            curated by Time &amp; Taste Catering with over three decades of royal culinary heritage in Lahore Cantt.
            Also featuring live charcoal barbecue, fresh seafoods, gourmet salads, and continental specialties.
          </p>

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
              onClick={handleCustomInquiry}
              className="menu-btn-glass"
            >
              <WhatsAppIcon size={18} />
              <span>Custom Inquiries</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. STICKY CATEGORY NAV PILLS ── */}
      <nav className="menu-sticky-nav" aria-label="Menu Sections Navigation">
        <div className="container menu-nav-inner">
          <div className="menu-nav-scroll">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`menu-nav-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => scrollToCategory(cat.id)}
              >
                <span className="pill-icon">{cat.icon}</span>
                <span className="pill-label">{cat.short}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container menu-main-content">
        {/* ── SECTION 1: ONE DISH MENUS (M1 - M7) ── */}
        <section id="packages" className="menu-section">
          <div className="menu-section-header">
            <span className="menu-sec-tag">OFFICIAL BANQUET BROCHURE</span>
            <h2 className="menu-sec-title">ONE DISH MENU (Menu 1 &mdash; Menu 7)</h2>
            <p className="menu-sec-sub">
              Official banquet menu packages compliant with government One Dish regulations,
              served with premium mutton, chicken specialties, fresh tandoor naan, gourmet salad, raita, dessert, and drinks.
            </p>

            {/* View Mode Switcher: Featured vs All 7 */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`view-mode-btn ${packageViewMode === 'featured' ? 'active' : ''}`}
                onClick={() => setPackageViewMode('featured')}
              >
                💎 Detailed Selected View
              </button>
              <button
                type="button"
                className={`view-mode-btn ${packageViewMode === 'all' ? 'active' : ''}`}
                onClick={() => setPackageViewMode('all')}
              >
                📜 All 7 Menus At A Glance
              </button>
            </div>
          </div>

          {packageViewMode === 'featured' ? (
            <>
              {/* Package Selector Tabs */}
              <div className="package-tabs" role="tablist">
                {MENU_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    role="tab"
                    aria-selected={activePackageId === pkg.id}
                    className={`pkg-tab ${activePackageId === pkg.id ? 'pkg-tab--active' : ''}`}
                    onClick={() => setActivePackageId(pkg.id)}
                  >
                    <span className="pkg-tab-code">{pkg.code}</span>
                    <span className="pkg-tab-tag">{pkg.tag}</span>
                  </button>
                ))}
              </div>

              {/* Active Package Card Presentation */}
              <article className="active-pkg-card" key={activePackage.id}>
                <header className="pkg-card-top">
                  <div className="pkg-card-ornament">
                    <span className="ornament-line" />
                    <span className="ornament-text">ONE DISH MENU</span>
                    <span className="ornament-line" />
                  </div>
                  <div className="pkg-badge-cluster">
                    <span className="pkg-code-pill">{activePackage.code}</span>
                    <span className="pkg-suitable-pill">{activePackage.suitableFor}</span>
                  </div>
                  <h3 className="pkg-card-title">{activePackage.code} &mdash; Official Banquet Package</h3>
                  <p className="pkg-card-highlight">{activePackage.highlight}</p>
                </header>

                {/* Structured Course List */}
                <div className="one-dish-course-list">
                  {activePackage.courses.map((c, idx) => (
                    <div
                      key={idx}
                      className={`one-dish-row ${c.hasChoice ? 'one-dish-row--choice' : ''}`}
                    >
                      <div className="one-dish-row-num">{idx + 1}</div>
                      <div className="one-dish-row-content">
                        <div className="one-dish-row-meta">
                          <span className="one-dish-course-icon">{c.icon}</span>
                          <span className="one-dish-course-label">{c.label}</span>
                        </div>

                        <div className="one-dish-options-wrap">
                          {c.hasChoice ? (
                            <div className="choice-pill-group">
                              {c.options.map((opt, oIdx) => (
                                <span key={oIdx} className="choice-pill-item">
                                  <span className="dish-name-badge">{opt}</span>
                                  {oIdx < c.options.length - 1 && (
                                    <span className="choice-or-badge" aria-label="or">
                                      OR
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="dish-name-badge dish-name-badge--single">
                              {c.options[0]}
                            </span>
                          )}
                        </div>

                        {c.note && (
                          <div className="one-dish-note">
                            <span className="note-text">{c.note}</span>
                            {c.label.toLowerCase().includes('dessert') && (
                              <button
                                type="button"
                                className="note-action-btn"
                                onClick={() => scrollToCategory('desserts')}
                              >
                                View 10 Dessert Choices &darr;
                              </button>
                            )}
                            {c.label.toLowerCase().includes('salad') && (
                              <button
                                type="button"
                                className="note-action-btn"
                                onClick={() => scrollToCategory('salads')}
                              >
                                View Salad Options &darr;
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="pkg-card-footer">
                  <div className="pkg-footer-info">
                    <span>
                      🏛️ Hall 16 Standard &bull; Curated by Time &amp; Taste Catering (30+ Years Heritage)
                    </span>
                  </div>
                  <div className="pkg-footer-btns">
                    <button
                      type="button"
                      className="btn-pkg-inquire"
                      onClick={() => handleInquirePackage(activePackage)}
                    >
                      <WhatsAppIcon size={18} />
                      <span>Inquire {activePackage.code} On WhatsApp</span>
                    </button>
                    <Link to="/reserve" className="btn-pkg-reserve">
                      Reserve Date &amp; Hall &rarr;
                    </Link>
                  </div>
                </footer>
              </article>

              {/* Quick Prompt to view all 7 */}
              <div className="all-menus-prompt">
                <span>Want to see all 7 One Dish menus side by side?</span>
                <button
                  type="button"
                  className="all-menus-prompt-btn"
                  onClick={() => setPackageViewMode('all')}
                >
                  Switch to All 7 Menus View 📜
                </button>
              </div>
            </>
          ) : (
            /* All 7 Menus Grid View (Brochure Style) */
            <div className="all-packages-brochure-grid">
              {MENU_PACKAGES.map((pkg) => (
                <article className="brochure-pkg-card" key={pkg.id}>
                  <header className="brochure-card-header">
                    <span className="brochure-one-dish-tag">ONE DISH MENU</span>
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
                      <span>Inquire {pkg.code}</span>
                    </button>
                    <button
                      type="button"
                      className="btn-brochure-detail"
                      onClick={() => {
                        setActivePackageId(pkg.id);
                        setPackageViewMode('featured');
                      }}
                    >
                      Full Details &rarr;
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ── SECTION 2: DESSERTS SELECTION (10 OFFICIAL DESSERTS) ── */}
        <section id="desserts" className="menu-section">
          <div className="menu-section-header">
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
                    onClick={() => handleInquireDessert(d)}
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

        {/* ── SECTION 3: ADD-ONS & LIVE STATIONS ── */}
        <section id="addons" className="menu-section">
          <div className="menu-section-header">
            <span className="menu-sec-tag">CULINARY THEATRE</span>
            <h2 className="menu-sec-title">Add-Ons &amp; Live Gourmet Stations</h2>
            <p className="menu-sec-sub">
              Upgrade your celebration with live cooking displays, artisan sweet counters, and premium whole-roast centerpieces.
            </p>
          </div>

          <div className="addons-grid">
            {MENU_ADD_ONS.map((item, idx) => (
              <div className="addon-card" key={idx}>
                <div className="addon-top">
                  <span className="addon-icon">{item.icon}</span>
                  {item.popular && <span className="addon-badge">MOST POPULAR</span>}
                </div>
                <h3 className="addon-title">{item.title}</h3>
                <p className="addon-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: SALADS ── */}
        <section id="salads" className="menu-section">
          <div className="menu-section-header">
            <span className="menu-sec-tag">FRESH &amp; VIBRANT</span>
            <h2 className="menu-sec-title">Gourmet Salads &amp; Cold Mezze</h2>
            <p className="menu-sec-sub">
              Crisp seasonal vegetables, artisan dressings, and house raitas to complement your royal banquet spread.
            </p>
          </div>

          <div className="item-cards-grid">
            {MENU_SALADS.map((s, idx) => (
              <div className="item-card" key={idx}>
                <div className="item-card-head">
                  <h3 className="item-name">{s.name}</h3>
                  <span className="item-tag">{s.type}</span>
                </div>
                <p className="item-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: CHARCOAL BBQ & GRILLS ── */}
        <section id="charcoal" className="menu-section">
          <div className="menu-section-header">
            <span className="menu-sec-tag">WOOD COALS &amp; FLAMES</span>
            <h2 className="menu-sec-title">Live Charcoal Barbecue &amp; Grills</h2>
            <p className="menu-sec-sub">
              Slow-marinated tender meats flame-kissed over burning wood charcoal by master grillers.
            </p>
          </div>

          <div className="item-cards-grid">
            {MENU_CHARCOAL.map((c, idx) => (
              <div className="item-card" key={idx}>
                <div className="item-card-head">
                  <h3 className="item-name">{c.name}</h3>
                  <span className="item-tag">{c.type}</span>
                </div>
                <p className="item-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: FRESH SEA FOODS ── */}
        <section id="seafoods" className="menu-section">
          <div className="menu-section-header">
            <span className="menu-sec-tag">OCEAN DELICACIES</span>
            <h2 className="menu-sec-title">Fresh Sea Foods &amp; Coastal Grills</h2>
            <p className="menu-sec-sub">
              Crispy crumbed fillets, giant tiger prawns, and whole pomfret tandoor roasts.
            </p>
          </div>

          <div className="item-cards-grid">
            {MENU_SEAFOODS.map((sf, idx) => (
              <div className="item-card" key={idx}>
                <div className="item-card-head">
                  <h3 className="item-name">{sf.name}</h3>
                  <span className="item-tag">{sf.type}</span>
                </div>
                <p className="item-desc">{sf.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 7: CONTINENTAL SPECIALTIES ── */}
        <section id="continental" className="menu-section">
          <div className="menu-section-header">
            <span className="menu-sec-tag">INTERNATIONAL CUISINE</span>
            <h2 className="menu-sec-title">Continental &amp; Global Specialties</h2>
            <p className="menu-sec-sub">
              Gourmet steaks, authentic Italian pastas, and European banquet favorites.
            </p>
          </div>

          <div className="item-cards-grid">
            {MENU_CONTINENTAL.map((cont, idx) => (
              <div className="item-card" key={idx}>
                <div className="item-card-head">
                  <h3 className="item-name">{cont.name}</h3>
                  <span className="item-tag">{cont.type}</span>
                </div>
                <p className="item-desc">{cont.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 8: CUSTOM MENU SELECTION BANNER ── */}
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
      </div>
    </div>
  );
}
