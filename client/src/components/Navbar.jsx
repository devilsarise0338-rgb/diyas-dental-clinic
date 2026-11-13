import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_CONFIG } from '../config/clinic';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Calendar, Globe } from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Logo Text Left */}
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <div className="brand-badge-icon">D</div>
          <div className="brand-text-block">
            <span className="brand-title-main">Diya's Dental Studio</span>
            <span className="brand-sub-badge">& General Care • Mansarovar</span>
          </div>
        </Link>

        {/* 6 Links Max - Guaranteed 1 Line with No Wrapping */}
        <nav aria-label="Primary Navigation">
          <ul className="navbar-nav-links">
            <li>
              <a href="/#hero" className="nav-anchor">
                {t('navHome')}
              </a>
            </li>
            <li>
              <a href="/#services" className="nav-anchor">
                {t('navServices')}
              </a>
            </li>
            <li>
              <a href="/#doctors" className="nav-anchor">
                {t('navDoctors')}
              </a>
            </li>
            <li>
              <a href="/#reviews" className="nav-anchor">
                {t('navReviews')}
              </a>
            </li>
            <li>
              <a href="/#location" className="nav-anchor">
                {t('navContact')}
              </a>
            </li>
            <li>
              <Link to="/admin" className="nav-anchor" title="Clinic Staff Portal">
                {t('navAdmin')}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Actions: Small EN/हिं toggle + Coral Book CTA */}
        <div className="navbar-right-actions">
          {/* Small EN/हिं toggle */}
          <button
            onClick={toggleLanguage}
            className="lang-toggle-pill"
            aria-label="Toggle Language"
            title="Switch Language / भाषा बदलें"
          >
            <Globe size={13} />
            <span>{language === 'en' ? 'EN / हिं' : 'हिं / EN'}</span>
          </button>

          {/* Warm Coral CTA Button */}
          <a href="/#appointment" className="btn btn-coral nav-cta-btn">
            <Calendar size={15} />
            <span>{t('bookAppointment')}</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Slide-in Menu */}
      {mobileOpen && (
        <div className="mobile-slide-drawer">
          <a href="/#hero" className="mobile-slide-link" onClick={closeMobile}>
            {t('navHome')}
          </a>
          <a href="/#services" className="mobile-slide-link" onClick={closeMobile}>
            {t('navServices')}
          </a>
          <a href="/#doctors" className="mobile-slide-link" onClick={closeMobile}>
            {t('navDoctors')}
          </a>
          <a href="/#reviews" className="mobile-slide-link" onClick={closeMobile}>
            {t('navReviews')}
          </a>
          <a href="/#location" className="mobile-slide-link" onClick={closeMobile}>
            {t('navContact')}
          </a>
          <Link to="/admin" className="mobile-slide-link" onClick={closeMobile}>
            🔒 {t('navAdmin')}
          </Link>

          <a
            href="/#appointment"
            className="btn btn-coral"
            onClick={closeMobile}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <Calendar size={16} />
            <span>{t('bookAppointment')}</span>
          </a>
        </div>
      )}
    </header>
  );
}
