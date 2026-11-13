import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { Phone, MessageCircle } from 'lucide-react';
import '../styles/FloatingButtons.css';

export default function FloatingButtons() {
  const callHref = CLINIC_CONFIG.phoneRaw ? `tel:${CLINIC_CONFIG.phoneRaw}` : '#location';
  const whatsappHref = `https://wa.me/${CLINIC_CONFIG.whatsappRaw || ''}?text=${encodeURIComponent(
    "Hello Diya's Dental & General Care Clinic, I would like to inquire about consultation."
  )}`;

  return (
    <>
      {/* Sticky Mobile Bottom Bar: Call & WhatsApp (Replaces floating buttons on mobile) */}
      <div className="mobile-sticky-bottom-bar" aria-label="Mobile quick action bar">
        <a href={callHref} className="mobile-bottom-btn call">
          <Phone size={17} />
          <span>Call: {CLINIC_CONFIG.phone}</span>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-bottom-btn whatsapp"
        >
          <MessageCircle size={18} />
          <span>WhatsApp Us</span>
        </a>
      </div>

      {/* Desktop Floating Pill on Bottom Right */}
      <div className="desktop-floating-pill-container">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="desktop-wa-pill"
          title={`WhatsApp (${CLINIC_CONFIG.whatsappNumber})`}
        >
          <MessageCircle size={18} />
          <span>WhatsApp ({CLINIC_CONFIG.whatsappNumber})</span>
        </a>
      </div>
    </>
  );
}
