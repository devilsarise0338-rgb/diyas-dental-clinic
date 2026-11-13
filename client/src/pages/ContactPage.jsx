import React from 'react';
import Location from '../components/Location';
import AppointmentForm from '../components/AppointmentForm';
import { CLINIC_CONFIG } from '../config/clinic';
import '../styles/Pages.css';

export default function ContactPage() {
  return (
    <div className="contact-page-view">
      <div className="page-hero-banner">
        <div className="container">
          <span className="section-badge">Visit or Call</span>
          <h1 className="page-hero-title">Contact & Directions</h1>
          <p className="page-hero-sub">
            Located at {CLINIC_CONFIG.address}. Easy parking and central access in Mansarovar.
          </p>
        </div>
      </div>
      <Location />
      <AppointmentForm />
    </div>
  );
}
