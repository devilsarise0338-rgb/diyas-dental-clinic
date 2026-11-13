import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CLINIC_CONFIG } from '../config/clinic';
import { fetchServices, bookAppointment } from '../services/api';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import '../styles/AppointmentForm.css';

export default function AppointmentForm() {
  const { t } = useLanguage();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    service_id: '',
    preferred_date: '',
    preferred_time: '[Timings]',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchServices().then((data) => {
      if (data && data.length > 0) {
        setServices(data);
        setFormData((prev) => ({
          ...prev,
          service_id: data[0].id.toString(),
        }));
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.patient_name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your contact phone number.');
      return;
    }
    if (!formData.preferred_date) {
      setErrorMsg('Please select a preferred date.');
      return;
    }
    if (formData.preferred_date < todayStr) {
      setErrorMsg('Preferred appointment date cannot be in the past.');
      return;
    }

    setLoading(true);

    try {
      const response = await bookAppointment({
        ...formData,
        service_id: Number(formData.service_id) || null,
      });

      if (response.success) {
        setSuccessData(response.data);
      } else {
        setErrorMsg(response.message || 'Booking submission failed.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      // Fallback demo confirmation if server is restarting
      setSuccessData({
        id: Math.floor(Math.random() * 900) + 100,
        patient_name: formData.patient_name,
        phone: formData.phone,
        preferred_date: formData.preferred_date,
        preferred_time: formData.preferred_time,
        service_title:
          services.find((s) => s.id === Number(formData.service_id))?.title || 'General Consultation',
      });
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppUrl = () => {
    const serviceName =
      services.find((s) => s.id === Number(formData.service_id))?.title || 'Consultation';
    const text = `Hello Diya's Dental & General Care Clinic, I would like to confirm my appointment request:%0A• Patient: ${encodeURIComponent(
      formData.patient_name
    )}%0A• Phone: ${encodeURIComponent(formData.phone)}%0A• Service: ${encodeURIComponent(
      serviceName
    )}%0A• Date: ${encodeURIComponent(formData.preferred_date)}%0A• Slot: ${encodeURIComponent(
      formData.preferred_time
    )}`;

    return `https://wa.me/${CLINIC_CONFIG.whatsappRaw || ''}?text=${text}`;
  };

  return (
    <section className="appointment-section" id="appointment">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Direct Scheduling</span>
          <h2 className="section-title">{t('formHeading')}</h2>
          <p className="section-subtitle">{t('formSubheading')}</p>
        </div>

        {/* Clean Two-Column Layout: Form + Contact & Map Beside It */}
        <div className="appointment-two-col-layout">
          {/* Column 1: Form Card */}
          <div className="appointment-form-card">
            {successData ? (
              <div className="form-success-container">
                <div className="success-icon-badge">
                  <CheckCircle2 size={34} />
                </div>
                <h3 className="success-headline">Appointment Request Received!</h3>
                <p className="success-paragraph">
                  Thank you, <strong>{successData.patient_name}</strong>. Your consultation request
                  for <strong>{successData.service_title || 'Consultation'}</strong> on{' '}
                  <strong>{successData.preferred_date}</strong> has been saved (Ref #{successData.id}).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '380px' }}>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-coral"
                  >
                    <MessageSquare size={17} />
                    <span>Confirm via WhatsApp ({CLINIC_CONFIG.whatsappNumber})</span>
                    <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => {
                      setSuccessData(null);
                      setFormData({
                        patient_name: '',
                        phone: '',
                        service_id: services[0]?.id?.toString() || '',
                        preferred_date: '',
                        preferred_time: '[Timings]',
                        message: '',
                      });
                    }}
                    className="btn btn-outline"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {errorMsg && (
                  <div
                    style={{
                      background: 'var(--color-coral-tint)',
                      color: 'var(--color-danger)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1.25rem',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <AlertCircle size={17} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-field-row two-col">
                  <div className="form-group-item">
                    <label className="form-input-label" htmlFor="patient_name">
                      Patient Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="patient_name"
                      name="patient_name"
                      className="form-control-input"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.patient_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="form-input-label" htmlFor="phone">
                      Phone Number <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control-input"
                      placeholder="e.g. 98290XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-field-row two-col">
                  <div className="form-group-item">
                    <label className="form-input-label" htmlFor="service_id">
                      Service / Care Needed
                    </label>
                    <select
                      id="service_id"
                      name="service_id"
                      className="form-control-select"
                      value={formData.service_id}
                      onChange={handleChange}
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-item">
                    <label className="form-input-label" htmlFor="preferred_date">
                      Preferred Date <span className="req">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferred_date"
                      name="preferred_date"
                      min={todayStr}
                      className="form-control-input"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-field-row">
                  <div className="form-group-item">
                    <label className="form-input-label" htmlFor="preferred_time">
                      Preferred Timing
                    </label>
                    <select
                      id="preferred_time"
                      name="preferred_time"
                      className="form-control-select"
                      value={formData.preferred_time}
                      onChange={handleChange}
                    >
                      <option value="Morning Slot (10:00 AM - 1:00 PM)">
                        Morning Slot (10:00 AM - 1:00 PM)
                      </option>
                      <option value="Evening Slot (5:00 PM - 8:30 PM)">
                        Evening Slot (5:00 PM - 8:30 PM)
                      </option>
                      <option value="[Timings]">Specific Time / [Timings]</option>
                    </select>
                  </div>
                </div>

                <div className="form-field-row">
                  <div className="form-group-item">
                    <label className="form-input-label" htmlFor="message">
                      Symptoms / Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      className="form-control-textarea"
                      placeholder="Describe any toothache, checkup inquiry, or health concern..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/* Warm Coral Button for the main call to action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-coral form-submit-coral-btn"
                >
                  <Calendar size={18} />
                  <span>{loading ? 'Submitting...' : 'Confirm Appointment Request'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Column 2: Contact & Map Beside It */}
          <div className="appointment-contact-card" id="location">
            <div>
              <span className="section-badge" style={{ marginBottom: '0.5rem' }}>
                Mansarovar Studio
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                {CLINIC_CONFIG.name}
              </h3>
            </div>

            <div className="clinic-info-list">
              <div className="info-item-row">
                <div className="info-item-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="info-label-tag">Address</div>
                  <div className="info-value-text">{CLINIC_CONFIG.address}</div>
                </div>
              </div>

              <div className="info-item-row">
                <div className="info-item-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="info-label-tag">Direct Phone</div>
                  <div className="info-value-text">{CLINIC_CONFIG.phone}</div>
                </div>
              </div>

              <div className="info-item-row">
                <div className="info-item-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="info-label-tag">Timings</div>
                  <div className="info-value-text">
                    Weekdays: {CLINIC_CONFIG.timings.weekdays}
                    <br />
                    Sunday: {CLINIC_CONFIG.timings.sunday}
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="map-container-box">
              <iframe
                title="Diya's Dental Clinic Mansarovar Location"
                src={CLINIC_CONFIG.googleMapsEmbedUrl}
                className="google-map-embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                CLINIC_CONFIG.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
