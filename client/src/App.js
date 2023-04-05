import React from 'react';
import './tailwind.css';
import IntroSection from './components/IntroSection';
import ServicesSection from './components/ServicesSection';
import ReviewsSection from './components/ReviewsSection';
import ContactUsSection from './components/ContactUsSection';
import FooterSection from './components/FooterSection';

function App() {
  return (
    <div>
      <IntroSection />
      <ServicesSection />
      <ReviewsSection />
      <ContactUsSection />
      <FooterSection />
    </div>
  );
}

export default App;