import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Clock,
  UserCheck,
  ShieldCheck,
  Building2,
  Feather,
  MessageCircle,
  HeartHandshake,
  Users,
} from 'lucide-react';
import '../styles/WhyUs.css';

export default function WhyUs() {
  const { t } = useLanguage();

  const counters = [
    {
      value: '9+',
      label: 'Years of Care',
      sub: 'Serving Mansarovar families',
      icon: <Clock size={22} />,
    },
    {
      value: '2',
      label: 'Specialist Doctors',
      sub: 'Dr. Neel Kamal & Dr. Gopal Lal Singhal',
      icon: <UserCheck size={22} />,
    },
    {
      value: '100%',
      label: 'Sterilised Instruments',
      sub: 'Multi-stage autoclaving',
      icon: <ShieldCheck size={22} />,
    },
    {
      value: '1',
      label: 'Studio Under One Roof',
      sub: 'Dental & General Medicine',
      icon: <Building2 size={22} />,
    },
  ];

  const features = [
    {
      title: 'Painless Care',
      desc: 'Gentle anesthetics and modern equipment ensuring stress-free visits for every patient.',
      icon: <Feather size={22} />,
    },
    {
      title: 'Hospital Sterilisation',
      desc: 'Multi-barrier autoclaving and sealed pouches for strictly controlled infection prevention.',
      icon: <ShieldCheck size={22} />,
    },
    {
      title: 'Clear Communication',
      desc: 'Honest diagnostic walkthroughs and complete clarity before any procedure begins.',
      icon: <MessageCircle size={22} />,
    },
    {
      title: 'Affordable Care',
      desc: 'High clinical quality and honest pricing tailored for families in Mansarovar.',
      icon: <HeartHandshake size={22} />,
    },
  ];

  return (
    <section className="why-navy-section" id="why-us">
      <div className="container">
        <div className="section-header">
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#60a5fa', borderColor: 'rgba(255,255,255,0.15)' }}>
            Why Choose Us
          </span>
          <h2 className="section-title">{t('whyUsHeading')}</h2>
          <p className="section-subtitle">{t('whyUsSubheading')}</p>
        </div>

        {/* 4 Animated Counters */}
        <div className="counters-grid">
          {counters.map((cnt, idx) => (
            <div className="counter-bento-card" key={idx}>
              <div className="counter-icon-wrap">{cnt.icon}</div>
              <div className="counter-digit">{cnt.value}</div>
              <div className="counter-label">{cnt.label}</div>
              <div className="counter-sub">{cnt.sub}</div>
            </div>
          ))}
        </div>

        {/* 4 Features Grid in Dark Navy */}
        <div className="why-features-grid">
          {features.map((feat, idx) => (
            <div className="why-feature-card" key={idx}>
              <div className="why-feat-icon">{feat.icon}</div>
              <h3 className="why-feat-title">{feat.title}</h3>
              <p className="why-feat-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
