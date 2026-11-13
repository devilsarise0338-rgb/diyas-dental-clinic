import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchReviews } from '../services/api';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Reviews.css';

export default function Reviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchReviews().then((data) => {
      if (data && data.length > 0) {
        setReviews(data);
      }
    });
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-header-row">
          <div>
            <span className="section-badge">Patient Feedback</span>
            <h2 className="section-title" style={{ marginBottom: '0.35rem' }}>
              {t('reviewsHeading')}
            </h2>
            <p className="section-subtitle">{t('reviewsSubheading')}</p>
          </div>

          <div className="reviews-desktop-nav-buttons">
            <button
              onClick={() => handleScroll('left')}
              className="btn btn-outline review-nav-btn"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="btn btn-outline review-nav-btn"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontally Scrolling Bento Cards */}
        <div className="reviews-scroll-container" ref={scrollRef}>
          {reviews.map((rev) => (
            <div className="review-bento-card" key={rev.id}>
              {/* Clearly marked Sample review */}
              <span className="review-sample-tag">Sample review</span>

              <div className="review-stars-row">
                {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <p className="review-body-quote">"{rev.comment}"</p>

              <div className="review-patient-meta">
                <div className="patient-avatar-circle">
                  {rev.patient_name.charAt(0)}
                </div>
                <div className="patient-info-col">
                  <span className="patient-name-text">{rev.patient_name}</span>
                  <span className="patient-loc-text">Verified Patient • Mansarovar, Jaipur</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="reviews-disclaimer-note">{t('sampleReviewNotice')}</p>
      </div>
    </section>
  );
}
