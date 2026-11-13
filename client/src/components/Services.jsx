import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchServices } from '../services/api';
import {
  Sparkles,
  Shield,
  Activity,
  PlusCircle,
  Smile,
  Award,
  Layers,
  Sun,
  Heart,
  Stethoscope,
  ArrowRight,
  Info,
} from 'lucide-react';
import '../styles/Services.css';

export default function Services() {
  const { t } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    fetchServices().then((data) => {
      if (mounted) {
        setServices(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const getIcon = (icon) => {
    switch (icon) {
      case 'sparkles':
        return <Sparkles size={24} />;
      case 'shield':
        return <Shield size={24} />;
      case 'activity':
        return <Activity size={24} />;
      case 'cross':
        return <PlusCircle size={24} />;
      case 'smile':
        return <Smile size={24} />;
      case 'award':
        return <Award size={24} />;
      case 'layers':
        return <Layers size={24} />;
      case 'sun':
        return <Sun size={24} />;
      case 'heart':
        return <Heart size={24} />;
      case 'stethoscope':
      default:
        return <Stethoscope size={24} />;
    }
  };

  const filtered = services.filter((s) => {
    if (filter === 'dental') return s.category === 'dental';
    if (filter === 'general') return s.category === 'general';
    return true;
  });

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-badge mint">Clinical Catalog</span>
          <h2 className="section-title">{t('servicesHeading')}</h2>
          <p className="section-subtitle">{t('servicesSubheading')}</p>
        </div>

        {/* Filter Pills */}
        <div className="services-filter-tabs">
          <button
            className={`service-filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Treatments ({services.length})
          </button>
          <button
            className={`service-filter-pill ${filter === 'dental' ? 'active' : ''}`}
            onClick={() => setFilter('dental')}
          >
            Dental Care
          </button>
          <button
            className={`service-filter-pill ${filter === 'general' ? 'active' : ''}`}
            onClick={() => setFilter('general')}
          >
            General Family Health
          </button>
        </div>

        {/* Bento Grid with Mixed Sizes */}
        <div className="services-bento-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="service-bento-card skeleton" style={{ minHeight: '220px' }}></div>
              ))
            : filtered.map((srv, index) => {
                const isFeatured = index === 0;
                return (
                  <div
                    key={srv.id}
                    className={`service-bento-card ${isFeatured ? 'featured' : ''}`}
                  >
                    <div className="service-icon-box">{getIcon(srv.icon)}</div>
                    <span className={`service-tag ${isFeatured ? 'mint' : ''}`}>
                      {isFeatured ? '★ Featured Treatment' : srv.category === 'general' ? 'Family Health' : 'Dental'}
                    </span>
                    <h3 className="service-title">{srv.title}</h3>
                    <p className="service-desc">{srv.description}</p>
                    <a href="#appointment" className="service-action-link">
                      <span>Book Consultation</span>
                      <ArrowRight size={15} />
                    </a>
                  </div>
                );
              })}
        </div>

        {/* Note that services are editable */}
        <div className="services-note-banner">
          <Info size={16} color="#2563EB" />
          <span>{t('servicesNote')}</span>
        </div>
      </div>
    </section>
  );
}
