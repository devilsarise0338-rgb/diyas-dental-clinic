import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Doctors from '../components/Doctors';
import WhyUs from '../components/WhyUs';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import AppointmentForm from '../components/AppointmentForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Doctors />
      <WhyUs />
      <Gallery />
      <Reviews />
      <AppointmentForm />
    </main>
  );
}
