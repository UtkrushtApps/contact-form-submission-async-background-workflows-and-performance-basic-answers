import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 40 }}>
      <h2>Contact Us</h2>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
