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
  const location = useLocation();
  const { openContactModal } = useContactModal();

  // Scroll to hash if provided (e.g., from navbar dropdown /menu#desserts or /menu#m3)
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '').toLowerCase();
      // If hash matches a package (m1 - m7)
      const foundPkg = MENU_PACKAGES.find((p) => p.id === hash);
      if (foundPkg) {
        setActivePackageId(foundPkg.id);
        setActiveCategory('packages');
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
    const text = encodeURIComponent(
      `Hello Rabat Banquet Hall, I am interested in booking catering for my event. I would like details and pricing for package: *${pkg.code} - ${pkg.name} (${pkg.tag})*.`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  };

  const handleCustomInquiry = () => {
    const text = encodeURIComponent(
      `Hello Rabat Banquet Hall, I would like to design a bespoke *Custom Catering Menu* with your executive chef for our upcoming celebration.`
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
            Time &amp; Taste Catering &bull; Hall 16
          </span>
          <h1 className="menu-hero-title">Royal Banquet Menus</h1>
          <p className="menu-hero-lead">
            Curated by Time &amp; Taste Catering with over three decades of royal culinary heritage in Lahore.
            Explore our 7 signature feast packages (M1 to M7), live charcoal grills, fresh seafoods, gourmet salads, and decadent desserts.
          </p>

          <div className="menu-hero-actions">
            <button
              type="button"
              onClick={() => scrollToCategory('packages')}
              className="menu-btn-gold"
            >
              Explore Packages M1 - M7 &darr;
            </button>
            <button
              type="button"
              onClick={handleCustomInquiry}
              className="menu-btn-glass"
            >
              <WhatsAppIcon size={18} />
              <span>Custom Menu Inquiries</span>
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
        {/* ── SECTION 1: SET PACKAGES M1 - M7 ── */}
        <section id="packages" className="menu-section">
          <div className="menu-section-header">
            <span className="menu-sec-tag">ROYAL FEAST SETS</span>
            <h2 className="menu-sec-title">Seven Signature Royal Packages (M1 - M7)</h2>
            <p className="menu-sec-sub">
              Complete multi-course banquet menus designed for Barats, Walimas, Mehndis, and Corporate Galas.
            </p>
          </div>

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
                <span className="pkg-tab-name">{pkg.name}</span>
                <span className="pkg-tab-tag">{pkg.tag}</span>
              </button>
            ))}
          </div>

          {/* Active Package Card Presentation */}
          <article className="active-pkg-card" key={activePackage.id}>
            <header className="pkg-card-top">
              <div className="pkg-badge-cluster">
                <span className="pkg-code-pill">{activePackage.code}</span>
                <span className="pkg-suitable-pill">{activePackage.suitableFor}</span>
              </div>
              <h3 className="pkg-card-title">{activePackage.name}</h3>
              <p className="pkg-card-highlight">{activePackage.highlight}</p>
            </header>

            <div className="pkg-courses-grid">
              {/* Welcome Drinks */}
              <div className="course-box">
                <div className="course-box-head">
                  <span className="course-icon">🍹</span>
                  <h4>Welcome Drinks</h4>
                </div>
                <ul className="course-items">
                  {activePackage.welcomeDrinks.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Starters & BBQ */}
              <div className="course-box">
                <div className="course-box-head">
                  <span className="course-icon">🍢</span>
                  <h4>Starters &amp; Live Barbecue</h4>
                </div>
                <ul className="course-items">
                  {activePackage.starters.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Royal Main Course */}
              <div className="course-box course-box--mains">
                <div className="course-box-head">
                  <span className="course-icon">🥘</span>
                  <h4>Royal Main Courses</h4>
                </div>
                <ul className="course-items">
                  {activePackage.mains.map((item, idx) => (
                    <li key={idx} className="item-highlight">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Breads & Tandoor */}
              <div className="course-box">
                <div className="course-box-head">
                  <span className="course-icon">🫓</span>
                  <h4>Breads &amp; Tandoor</h4>
                </div>
                <ul className="course-items">
                  {activePackage.breads.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Salads & Raitas */}
              <div className="course-box">
                <div className="course-box-head">
                  <span className="course-icon">🥗</span>
                  <h4>Salads &amp; Accompaniments</h4>
                </div>
                <ul className="course-items">
                  {activePackage.salads.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Traditional Desserts */}
              <div className="course-box">
                <div className="course-box-head">
                  <span className="course-icon">🍨</span>
                  <h4>Dessert Grand Finale</h4>
                </div>
                <ul className="course-items">
                  {activePackage.desserts.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <footer className="pkg-card-footer">
              <div className="pkg-footer-info">
                <span>Tailored for 200 to 1,500+ guests &bull; Hall 16 Banquet Standard</span>
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
        </section>

        {/* ── SECTION 2: ADD-ONS & LIVE STATIONS ── */}
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

        {/* ── SECTION 3: DESSERTS ── */}
        <section id="desserts" className="menu-section">
          <div className="menu-section-header">
            <span className="menu-sec-tag">ROYAL SWEETS</span>
            <h2 className="menu-sec-title">Imperial Desserts &amp; Sweet Bar</h2>
            <p className="menu-sec-sub">
              Traditional silver-leaf halwas, chilled earthen clay kheer, and authentic Moroccan pastries.
            </p>
          </div>

          <div className="item-cards-grid">
            {MENU_DESSERTS.map((d, idx) => (
              <div className="item-card" key={idx}>
                <div className="item-card-head">
                  <h3 className="item-name">{d.name}</h3>
                  <span className="item-tag">{d.tag}</span>
                </div>
                <p className="item-desc">{d.desc}</p>
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
              Crisp seasonal vegetables, artisan cheeses, and house dressings to complement every feast.
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
