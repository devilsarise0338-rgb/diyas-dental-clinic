import React from 'react';
import Doctors from '../components/Doctors';
import WhyUs from '../components/WhyUs';
import TrustStrip from '../components/TrustStrip';
import { CLINIC_CONFIG } from '../config/clinic';
import '../styles/Pages.css';

export default function AboutPage() {
  return (
    <div className="about-page-view">
      <div className="page-hero-banner">
        <div className="container">
          <span className="section-badge">{CLINIC_CONFIG.yearsOfCare} of Trusted Healthcare</span>
          <h1 className="page-hero-title">About Our Clinic Studio</h1>
          <p className="page-hero-sub">
            Established in Mansarovar, Jaipur to bring modern painless dentistry and attentive family healthcare together.
          </p>
        </div>
      </div>
      <TrustStrip />
      <Doctors />
      <WhyUs />
    </div>
  );
}
