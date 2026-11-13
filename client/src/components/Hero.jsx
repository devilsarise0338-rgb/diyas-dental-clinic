import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Phone, CheckCircle, UserCheck } from 'lucide-react';
import '../styles/Hero.css';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero-wrapper" id="hero">
      <div className="container">
        <div className="hero-container-grid">
          {/* Left Column: Giant Headline & CTAs */}
          <div className="hero-left-content">
            <div className="hero-pill-badge">
              <span className="hero-pill-indicator"></span>
              <span>{t('heroBadge')}</span>
            </div>

            <h1 className="hero-giant-headline">{t('heroHeadline')}</h1>

            <p className="hero-punchy-subline">{t('heroSubtext')}</p>

            <div className="hero-button-row">
              {/* Warm Coral Main CTA Button */}
              <a href="#appointment" className="btn btn-coral">
                <Calendar size={18} />
                <span>{t('bookAppointment')}</span>
              </a>

              {/* Outlined Call Now */}
              <a
                href={CLINIC_CONFIG.phoneRaw ? `tel:${CLINIC_CONFIG.phoneRaw}` : '#location'}
                className="btn btn-outline"
              >
                <Phone size={17} />
                <span>
                  {t('callNow')}: {CLINIC_CONFIG.phone}
                </span>
              </a>
            </div>

            {/* Quick Trust Chips */}
            <div className="hero-trust-chips">
              <div className="trust-chip-item">
                <CheckCircle size={16} className="trust-chip-dot" />
                <span>9+ Years in Mansarovar</span>
              </div>
              <div className="trust-chip-item">
                <CheckCircle size={16} className="trust-chip-dot" />
                <span>Dr. Neel Kamal & Dr. Gopal Lal Singhal</span>
              </div>
              <div className="trust-chip-item">
                <CheckCircle size={16} className="trust-chip-dot" />
                <span>Painless & Family Care</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bento Cluster of 3 Rounded Cards with Soft Floating Animation */}
          <div className="hero-bento-cluster">
            {/* 1. Gradient photo-style placeholder card */}
            <div className="bento-card-main">
              <div className="bento-main-header">
                <span className="bento-main-badge">[Clinic Studio Visual]</span>
                <span className="bento-live-status">
                  <span className="bento-status-dot"></span> Open Today
                </span>
              </div>

              <div className="bento-img-container">
                <img
                  src="/assets/clinic-studio.svg"
                  alt="Diya's Dental and General Care Clinic Studio, Mansarovar Jaipur"
                  className="bento-main-img"
                  loading="eager"
                />
              </div>

              <h3 className="bento-main-title">Modern Dental & Health Studio</h3>
              <p className="bento-main-sub">
                120A, Shri Ram Vihar A, Manyawas, Mansarovar, Jaipur
              </p>
            </div>

            {/* 2. 9+ Years Stat Card */}
            <div className="bento-card-stat">
              <span className="bento-stat-num">9+</span>
              <span className="bento-stat-label">Years of Care</span>
              <span className="bento-stat-sub">Trusted by Jaipur families</span>
            </div>

            {/* 3. 2 Expert Doctors Card */}
            <div className="bento-card-doctors">
              <span className="bento-doctors-badge">
                <UserCheck size={14} /> 2 Attending Doctors
              </span>
              <span className="bento-doctors-title">Specialist Care</span>
              <span className="bento-doctors-names">
                Dr. Neel Kamal<br />Dr. Gopal Lal Singhal
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
