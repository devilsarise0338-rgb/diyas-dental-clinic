import React from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_CONFIG } from '../config/clinic';
import { Calendar, Phone, MapPin, Clock, Lock, Sparkles } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Big "Book your visit today" Strip Above Footer */}
      <section className="footer-cta-strip">
        <div className="container">
          <h2 className="footer-cta-headline">Book your visit today</h2>
          <p className="footer-cta-sub">
            Gentle dental care and attentive family healthcare in Mansarovar, Jaipur.
            Reserve your consultation with Dr. Neel Kamal or Dr. Gopal Lal Singhal.
          </p>

          <div className="footer-cta-actions">
            {/* Warm Coral Button */}
            <a href="#appointment" className="btn btn-coral" style={{ padding: '0.85rem 2rem' }}>
              <Calendar size={18} />
              <span>Book Appointment</span>
            </a>

            {/* Outlined White Button */}
            <a
              href={CLINIC_CONFIG.phoneRaw ? `tel:${CLINIC_CONFIG.phoneRaw}` : '#location'}
              className="btn btn-outline"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)', padding: '0.85rem 1.8rem' }}
            >
              <Phone size={17} />
              <span>Call Now: {CLINIC_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Dark Navy 3-Column Footer */}
      <footer className="site-footer-navy">
        <div className="container">
          <div className="footer-three-col-grid">
            {/* Column 1: Brand & Legacy */}
            <div>
              <h4 className="footer-brand-title">{CLINIC_CONFIG.name}</h4>
              <p className="footer-brand-text">
                Painless dental procedures and dedicated family health consultations under one roof in Mansarovar, Jaipur. Serving patients with trust for 9+ years.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-mint)', fontSize: '0.825rem', fontWeight: 700 }}>
                <Sparkles size={14} />
                <span>9+ Years Serving Jaipur Patients</span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h5 className="footer-col-header">Quick Links</h5>
              <ul className="footer-nav-menu">
                <li className="footer-nav-link">
                  <a href="#hero">Home</a>
                </li>
                <li className="footer-nav-link">
                  <a href="#services">Services & Treatments</a>
                </li>
                <li className="footer-nav-link">
                  <a href="#doctors">Meet the Doctors</a>
                </li>
                <li className="footer-nav-link">
                  <a href="#why-us">Why Choose Us</a>
                </li>
                <li className="footer-nav-link">
                  <a href="#reviews">Patient Reviews</a>
                </li>
                <li className="footer-nav-link">
                  <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#60a5fa' }}>
                    <Lock size={12} /> Staff Admin Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Mansarovar Clinic Info */}
            <div>
              <h5 className="footer-col-header">Clinic Location</h5>
              <div className="footer-contact-list">
                <div className="footer-contact-row">
                  <MapPin size={16} color="#60a5fa" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{CLINIC_CONFIG.address}</span>
                </div>
                <div className="footer-contact-row">
                  <Phone size={16} color="#60a5fa" style={{ flexShrink: 0 }} />
                  <span>Phone: {CLINIC_CONFIG.phone}</span>
                </div>
                <div className="footer-contact-row">
                  <Clock size={16} color="#60a5fa" style={{ flexShrink: 0 }} />
                  <span>Timings: {CLINIC_CONFIG.timings.weekdays}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="footer-bottom-copyright">
            <div>© {currentYear} {CLINIC_CONFIG.name}. All rights reserved.</div>
            <div>Attended by Dr. Neel Kamal & Dr. Gopal Lal Singhal • Mansarovar, Jaipur</div>
          </div>
        </div>
      </footer>
    </>
  );
}
