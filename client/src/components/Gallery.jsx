import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MoveHorizontal } from 'lucide-react';
import '../styles/Gallery.css';

export default function Gallery() {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Smile Gallery</span>
          <h2 className="section-title">{t('galleryHeading')}</h2>
          <p className="section-subtitle">{t('gallerySubheading')}</p>
        </div>

        <div className="gallery-box-wrapper">
          <div className="gallery-bento-card">
            <div className="modern-slider-canvas">
              {/* After Layer (Background Full) */}
              <div className="slider-layer-full after-view">
                <img
                  src="/assets/smile-after.svg"
                  alt="Smile condition after aesthetic dental treatment"
                  className="slider-layer-img"
                  loading="lazy"
                />
              </div>

              {/* Before Layer (Clipped to sliderPos %) */}
              <div
                className="slider-layer-full before-view"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                <img
                  src="/assets/smile-before.svg"
                  alt="Smile condition before treatment"
                  className="slider-layer-img"
                  loading="lazy"
                />
              </div>

              {/* Split Line & Handle Knob */}
              <div className="slider-split-line" style={{ left: `${sliderPos}%` }}>
                <div className="slider-split-knob" aria-hidden="true">
                  <MoveHorizontal size={18} />
                </div>
              </div>

              {/* Invisible native range input for smooth drag */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="slider-native-input"
                aria-label="Drag before and after smile comparison slider"
              />
            </div>

            <div className="gallery-bottom-caption">
              <span>← Drag slider horizontally to compare →</span>
              <span>
                <strong>Demonstration Case</strong> (Replaceable with clinic clinical cases)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
