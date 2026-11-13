import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CLINIC_CONFIG } from '../config/clinic';
import { MapPin, Phone, Clock, Mail, Navigation, ExternalLink } from 'lucide-react';
import '../styles/Location.css';

export default function Location() {
  const { t } = useLanguage();

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    CLINIC_CONFIG.address
  )}`;

  return (
    <section className="location-section" id="location">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">{t('navContact')}</span>
          <h2 className="section-title">{t('locationHeading')}</h2>
          <p className="section-subtitle">{t('locationSubheading')}</p>
        </div>

        <div className="location-grid">
          {/* Clinic Contact & Schedule Info Card */}
          <div className="location-info-card">
            <h3 style={{ fontSize: '1.45rem', color: 'var(--color-primary)' }}>
              {CLINIC_CONFIG.name}
            </h3>

            {/* Address */}
            <div className="clinic-meta-row">
              <div className="clinic-meta-icon">
                <MapPin size={22} />
              </div>
              <div className="clinic-meta-content">
                <span className="clinic-meta-label">Clinic Location</span>
                <span className="clinic-meta-value">{CLINIC_CONFIG.address}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="clinic-meta-row">
              <div className="clinic-meta-icon">
                <Phone size={22} />
              </div>
              <div className="clinic-meta-content">
                <span className="clinic-meta-label">Phone & Inquiries</span>
                <span className="clinic-meta-value">{CLINIC_CONFIG.phone}</span>
              </div>
            </div>

            {/* Timings */}
            <div className="clinic-meta-row">
              <div className="clinic-meta-icon">
                <Clock size={22} />
              </div>
              <div className="clinic-meta-content">
                <span className="clinic-meta-label">Consultation Hours</span>
                <span className="clinic-meta-value">
                  Monday – Saturday: {CLINIC_CONFIG.timings.weekdays}
                  <br />
                  Sunday: {CLINIC_CONFIG.timings.sunday}
                </span>
              </div>
            </div>

            {/* Doctors in Attendance */}
            <div className="clinic-meta-row">
              <div className="clinic-meta-icon">
                <Navigation size={22} />
              </div>
              <div className="clinic-meta-content">
                <span className="clinic-meta-label">Attending Physicians</span>
                <span className="clinic-meta-value">
                  • Dr. Neel Kamal (Dental Surgeon)
                  <br />• Dr. Gopal Lal Singhal (General Physician)
                </span>
              </div>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: '0.5rem' }}
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="location-map-wrapper">
            <iframe
              title="Diya's Dental and General Care Clinic Map Location"
              src={CLINIC_CONFIG.googleMapsEmbedUrl}
              className="location-iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
