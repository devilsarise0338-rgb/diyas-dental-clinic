import React from 'react';
import Services from '../components/Services';
import AppointmentForm from '../components/AppointmentForm';
import '../styles/Pages.css';

export default function ServicesPage() {
  return (
    <div className="services-page-view">
      <div className="page-hero-banner">
        <div className="container">
          <span className="section-badge">Comprehensive Clinical Treatments</span>
          <h1 className="page-hero-title">Dental & General Care Services</h1>
          <p className="page-hero-sub">
            Gentle dental surgery, restorative dentistry, and family health consultations by Dr. Neel Kamal & Dr. Gopal Lal Singhal.
          </p>
        </div>
      </div>
      <Services />
      <AppointmentForm />
    </div>
  );
}
