import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { Clock, UserCheck, Shield, MapPin } from 'lucide-react';
import '../styles/TrustStrip.css';

export default function TrustStrip() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'clock':
        return <Clock size={22} />;
      case 'user-check':
        return <UserCheck size={22} />;
      case 'shield':
        return <Shield size={22} />;
      case 'map-pin':
      default:
        return <MapPin size={22} />;
    }
  };

  return (
    <section className="trust-strip-section" aria-label="Clinic Trust Highlights">
      <div className="container">
        <div className="trust-strip-grid">
          {CLINIC_CONFIG.trustBadges.map((badge, idx) => (
            <div className="trust-item" key={idx}>
              <div className="trust-icon-box">{getIcon(badge.icon)}</div>
              <div className="trust-text-col">
                <span className="trust-label">{badge.label}</span>
                <span className="trust-subtitle">{badge.sub || badge.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
