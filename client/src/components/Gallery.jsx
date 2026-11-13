import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MoveHorizontal, Sparkles, Smile } from 'lucide-react';
import '../styles/Gallery.css';

export default function Gallery() {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Before & After</span>
          <h2 className="section-title">{t('galleryHeading')}</h2>
          <p className="section-subtitle">{t('gallerySubheading')}</p>
        </div>

        <div className="gallery-box-wrapper">
          <div className="gallery-bento-card">
            <div className="modern-slider-canvas">
              {/* After Layer (Background) */}
              <div className="slider-layer-full after-view">
                <span className="slider-tag-pill after">After Treatment</span>
                <div className="slider-center-icon after">
                  <Sparkles size={40} />
                </div>
                <h4 className="slider-display-title">Restored Natural Radiance</h4>
                <p className="slider-display-desc">
                  [Aesthetic Teeth Whitening & Composite Smile Realignment Result]
                </p>
              </div>

              {/* Before Layer (Clipped to sliderPos %) */}
              <div
                className="slider-layer-full before-view"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                <span className="slider-tag-pill before">Before Treatment</span>
                <div className="slider-center-icon before">
                  <Smile size={40} />
                </div>
                <h4 className="slider-display-title">Initial Enamel Condition</h4>
                <p className="slider-display-desc">
                  [Deep Discoloration, Cavity Decay & Misalignment Pre-Treatment]
                </p>
              </div>

              {/* Split Line & Handle Knob */}
              <div className="slider-split-line" style={{ left: `${sliderPos}%` }}>
                <div className="slider-split-knob" aria-hidden="true">
                  <MoveHorizontal size={18} />
                </div>
              </div>

              {/* Invisible native input for smooth drag */}
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
                <strong>Demonstration Case</strong> (Replaceable with clinic photography)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
