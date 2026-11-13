import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CLINIC_CONFIG } from '../config/clinic';
import { fetchDoctors } from '../services/api';
import { GraduationCap, Calendar, CheckCircle } from 'lucide-react';
import '../styles/Doctors.css';

export default function Doctors() {
  const { t } = useLanguage();
  const [doctors, setDoctors] = useState(CLINIC_CONFIG.doctors);

  useEffect(() => {
    fetchDoctors().then((data) => {
      if (data && data.length > 0) {
        const merged = data.map((d, idx) => ({
          ...d,
          specialities: CLINIC_CONFIG.doctors[idx]?.specialities || [
            'Experienced Care',
            'Patient Consultation',
          ],
        }));
        setDoctors(merged);
      }
    });
  }, []);

  return (
    <section className="doctors-section" id="doctors">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Medical Team</span>
          <h2 className="section-title">{t('doctorsHeading')}</h2>
          <p className="section-subtitle">{t('doctorsSubheading')}</p>
        </div>

        <div className="doctors-grid">
          {doctors.map((doc, idx) => {
            const isDrNeel = idx === 0 || doc.name?.includes('Neel');
            const avatarSrc = isDrNeel
              ? '/assets/dr-neel-kamal.svg'
              : '/assets/dr-gopal-singhal.svg';

            return (
              <div className="doctor-bento-card" key={doc.id || idx}>
                {/* Big Photo Placeholder with Vector Illustration */}
                <div className="doctor-photo-block">
                  <img
                    src={avatarSrc}
                    alt={`Doctor profile portrait representation for ${doc.name}`}
                    className="doctor-avatar-svg"
                    loading="lazy"
                  />
                  <span className="doctor-photo-tag">[Photo Placeholder]</span>
                </div>

                {/* Doctor Details */}
                <div className="doctor-card-content">
                  <h3 className="doctor-title-name">{doc.name}</h3>
                  <span className="doctor-spec-subtitle">{doc.designation}</span>

                  {/* Qualification Placeholder */}
                  <div className="doctor-qual-badge">
                    <GraduationCap size={15} />
                    <span>Qualification: {doc.qualification || '[Qualification]'}</span>
                  </div>

                  <p className="doctor-bio-text">{doc.bio}</p>

                  {doc.specialities && (
                    <div className="doctor-specialties-wrap">
                      {doc.specialities.map((item, i) => (
                        <span className="doctor-spec-tag" key={i}>
                          <CheckCircle size={12} className="spec-check-icon" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* "Book with Dr. ..." button */}
                  <a href="#appointment" className="btn btn-primary doctor-cta-button">
                    <Calendar size={16} />
                    <span>Book with {doc.name.split(' ')[1]}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
